import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
/*eslint-disable @takurinton/limit-import-scope/ */
import { App } from "../client/App";

const S3_DOMAIN = process.env.S3_DOMAIN
  ? "https://s3.ap-northeast-1.amazonaws.com/wip.blog.takurinton.dev"
  : "http://localhost:3001";

export const createTemplate = (props) => {
  const json = JSON.stringify(props.props);
  if (props.description == undefined)
    props.description = "たくりんとんのブログです。";
  if (props.image == undefined) props.image = "https://takurinton.dev/me.jpeg";
  return `<!DOCTYPE html>
    <html lang="ja">
        <head>
            <link rel="preconnect" href="https://blog.takurinton.dev/" />
            <title>${props.title}</title>
            <meta name="description" content="${props.description}" />
            <meta property="og:title" content="${props.title}" />
            <meta property="og:description" content="${props.description}" />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content="https://photo.takurinton.dev" />
            <meta property="og:image" content="${props.image}" />
            <meta property="og:site_name" content="${props.title}" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content=${""} />
            <meta name="twitter:title" content="${props.title}" />
            <meta name="twitter:description" content="${props.description}" />
            <meta name="twitter:image" content="${props.image}" />
            <link rel="shortcut icon" href=${"https://takurinton.dev/me.jpeg"} />
            <link rel="apple-touch-icon" href=${"https://takurinton.dev/me.jpeg"} />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/atom-one-dark-reasonable.min.css"
            />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style>
                body {
                    padding: 0; 
                    margin: 0;
                    margin-bottom: 50px;
                    font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                @media (max-width: 414px) {
                    font-size: 80%;
                }

                pre {
                    font-size: 16px;
                    padding: 10px;
                    overflow: auto;
                    background-color: #2c2d3a;
                    border-radius: 5px;
                    box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
                }

                code {
                    font-weight: 500;
                    color: #ffffff;
                    font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                }
            </style>
            ${props.styleTags}
        </head >
        <body>
            <div id="__rinton">${props.htmlString}</div>
            <script id="__RINTON_DATA__" type="application/json">${json}</script>
            <script async defer src="${S3_DOMAIN}/main.js"></script>
        </body>
    </html>
    `;
};

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
