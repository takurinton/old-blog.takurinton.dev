import { createClient, Client, ClientOptions } from 'urql';
import fetch from 'node-fetch';

let urqlClient: Client | null = null;

export function resetClient() {
    urqlClient = null;
}

export function initUrqlClient(
    clientOptions: ClientOptions,
): Client | null {
    const isServer = typeof window === 'undefined';

    if (isServer || !urqlClient) {
        urqlClient = new Client({
            fetch,
            ...clientOptions,
        });
        (urqlClient as any).toJSON = () => null;
    }

    return urqlClient;
}