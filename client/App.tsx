import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "ingred-ui";
import { RecoilRoot } from "recoil";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { External } from "./pages/External";
import {
    dedupExchange,
    cacheExchange,
    fetchExchange,
    ssrExchange,
    Provider,
} from "urql";
import { initUrqlClient } from "../shared/initUrqlClient";

export const App: React.FC<{
    props: any;
}> = ({ props }): JSX.Element => {
    const theme = createTheme();

    const isServerSide = typeof window === 'undefined';
    const ssr = ssrExchange({
        isClient: !isServerSide,
        initialState: !isServerSide ? JSON.parse(document.getElementById('data').getAttribute('data-json')) : props,
    });

    const client = initUrqlClient({
        url: 'https://api.takurinton.com/graphql',
        exchanges: [
            dedupExchange,
            cacheExchange,
            ssr,
            fetchExchange,
        ],
    });

    return (
        <>
            <RecoilRoot>
                <Provider value={client}>
                    <ThemeProvider theme={theme}>
                        <Routes>
                            <Route path="/" element={<Home props={props} />} />
                            <Route path="/post/:id" element={<Post props={props} />} />
                            <Route path="/external" element={<External props={props} />} />
                            <Route path="about" element={<About />} />
                        </Routes>
                    </ThemeProvider>
                </Provider>
            </RecoilRoot>
        </>
    )
}
