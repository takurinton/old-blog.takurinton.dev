import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from './App';
import {
    createClient,
    dedupExchange,
    cacheExchange,
    fetchExchange,
    ssrExchange,
    Provider,
} from "urql";

(() => {
    const isServerSide = typeof window === 'undefined';

    if (!isServerSide) {
        console.log(JSON.parse(document.getElementById('data').getAttribute('data-json')));
    }

    const ssr = ssrExchange({
        isClient: !isServerSide,
        initialState: !isServerSide ? JSON.parse(document.getElementById('data').getAttribute('data-json')) : undefined,
    });

    const client = createClient({
        url: 'https://api.takurinton.com/graphql',
        exchanges: [
            dedupExchange,
            cacheExchange,
            ssr,
            fetchExchange,
        ],
    });

    const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
    ReactDOM.hydrate(
        <BrowserRouter>
            <Provider value={client}>
                <App props={json} />
            </Provider>
        </BrowserRouter>,
        document.getElementById("main")
    );
})();
