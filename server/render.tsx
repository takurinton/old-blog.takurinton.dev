import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
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
    const sheet = new ServerStyleSheet()
    const html = ReactDOMServer.renderToString(
        sheet.collectStyles(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <App props={props} />
                    {/* {
                    createElement(
                        Html({
                            children: () => <App props={props} />,
                            title,
                            description,
                            image,
                            props,
                        })
                    )} */}
                </StaticRouter>
            </React.StrictMode>
        )
    );
    const styleTags = sheet.getStyleTags();
    return { html, styleTags }
}