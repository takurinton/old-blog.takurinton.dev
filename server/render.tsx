import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "../client/App";
import Html from "./Html";

export async function render({
    url,
    title,
    description,
    image,
    props,
}: {
    url: string;
    title: string;
    description: string;
    image: string;
    props?: any;
}) {
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                {
                    createElement(
                        Html({
                            children: () => <App props={props} />,
                            title,
                            description,
                            image,
                            props,
                        })
                    )}
            </StaticRouter>
        </React.StrictMode>
    );
}