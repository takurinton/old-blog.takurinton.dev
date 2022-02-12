import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
import { App } from "../client/App";
import { createTemplate } from "./Html";

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
    const sheet = new ServerStyleSheet();
    const htmlString = ReactDOMServer.renderToString(
        sheet.collectStyles(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <App props={props} />
                </StaticRouter>
            </React.StrictMode>
        )
    );

    const styleTags = sheet.getStyleTags();
    const html = createTemplate({
        url,
        title,
        description,
        image,
        props,
        styleTags,
        htmlString,
    });

    return html;
}