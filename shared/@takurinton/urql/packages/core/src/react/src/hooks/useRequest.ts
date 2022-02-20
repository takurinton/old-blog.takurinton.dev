import { DocumentNode } from 'graphql';
import { useRef, useMemo } from 'react';
import {
  TypedDocumentNode,
  GraphQLRequest,
  createRequest,
} from '@takurinton/urql';

/** Creates a request from a query and variables but preserves reference equality if the key isn't changing */
export function useRequest<Data = any, Variables = object>(
  query: string | DocumentNode | TypedDocumentNode<Data, Variables>,
  variables?: Variables
): GraphQLRequest<Data, Variables> {
  const prev = useRef<undefined | GraphQLRequest<Data, Variables>>(undefined);

  return useMemo(() => {
    const request = createRequest<Data, Variables>(query, variables);
    // We manually ensure reference equality if the key hasn't changed
    if (prev.current !== undefined && prev.current.key === request.key) {
      return prev.current;
    } else {
      prev.current = request;
      return request;
    }
  }, [query, variables]);
}
