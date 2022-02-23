/* eslint-disable @typescript-eslint/no-use-before-define */
import { filter, map, merge, pipe, share, tap } from 'wonka';

import { Client } from '../client';
import { Exchange, Operation, OperationResult } from '../types';

import {
  makeOperation,
  addMetadata,
  collectTypesFromResponse,
  formatDocument,
} from '../utils';

type ResultCache = Map<number, OperationResult>;

interface OperationCache {
  [key: string]: Set<number>;
}

const shouldSkip = ({ kind }: Operation) => kind !== 'query';

export const cacheExchange: Exchange = ({ forward, client, dispatchDebug }) => {
  const resultCache = new Map() as ResultCache;
  const operationCache = Object.create(null) as OperationCache;

  // Adds unique typenames to query (for invalidating cache entries)
  const mapTypeNames = (operation: Operation): Operation => {
    const formattedOperation = makeOperation(operation.kind, operation);
    formattedOperation.query = formatDocument(operation.query);
    return formattedOperation;
  };

  const isOperationCached = (operation: Operation) => {
    const {
      key,
      kind,
      context: { requestPolicy },
    } = operation;
    return (
      kind === 'query' &&
      requestPolicy !== 'network-only' &&
      (requestPolicy === 'cache-only' || resultCache.has(key))
    );
  };

  return ops$ => {
    const sharedOps$ = share(ops$);

    const cachedOps$ = pipe(
      sharedOps$,
      filter(op => !shouldSkip(op) && isOperationCached(op)),
      map(operation => {
        const cachedResult = resultCache.get(operation.key);

        dispatchDebug({
          operation,
          ...(cachedResult
            ? {
                type: 'cacheHit',
                message: 'The result was successfully retried from the cache',
              }
            : {
                type: 'cacheMiss',
                message: 'The result could not be retrieved from the cache',
              }),
        });

        const result: OperationResult = {
          ...cachedResult,
          operation: addMetadata(operation, {
            cacheOutcome: cachedResult ? 'hit' : 'miss',
          }),
        };

        if (operation.context.requestPolicy === 'cache-and-network') {
          result.stale = true;
          reexecuteOperation(client, operation);
        }

        return result;
      })
    );

    const forwardedOps$ = pipe(
      merge([
        pipe(
          sharedOps$,
          filter(op => !shouldSkip(op) && !isOperationCached(op)),
          map(mapTypeNames)
        ),
        pipe(
          sharedOps$,
          filter(op => shouldSkip(op))
        ),
      ]),
      map(op => addMetadata(op, { cacheOutcome: 'miss' })),
      filter(
        op => op.kind !== 'query' || op.context.requestPolicy !== 'cache-only'
      ),
      forward,
      tap(response => {
        const { operation } = response;
        if (!operation) return;

        const typenames = collectTypesFromResponse(response.data).concat(
          operation.context.additionalTypenames || []
        );

        if (operation.kind === 'query' && response.data) {
          resultCache.set(operation.key, response);
          for (let i = 0; i < typenames.length; i++) {
            const typeName = typenames[i];
            const operations =
              operationCache[typeName] ||
              (operationCache[typeName] = new Set());
            operations.add(operation.key);
          }
        }
      })
    );

    return merge([cachedOps$, forwardedOps$]);
  };
};

// Reexecutes a given operation with the default requestPolicy
export const reexecuteOperation = (client: Client, operation: Operation) => {
  return client.reexecuteOperation(
    makeOperation(operation.kind, operation, {
      ...operation.context,
      requestPolicy: 'network-only',
    })
  );
};
