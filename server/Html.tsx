import * as React from 'react';
import {
    createClient,
    dedupExchange,
    cacheExchange,
    fetchExchange,
    ssrExchange,
    Provider,
    useQuery,
} from 'urql';

const STATIC_FILES = process.env.STATIC_FILES ?? 'http://localhost:3001';

const Head = (props) => {
    if (props.description == undefined) props.description = 'たくりんとんのポートフォリオです';
    if (props.image == undefined) props.image = 'https://takurinton.dev/me.jpeg';
    return (
        <head>
            <link rel="preconnect" href="https://ssr-test.takurinton.vercel.app/" />
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content="https://photo.takurinton.dev" />
            <meta property="og:image" content={props.image} />
            <meta property="og:site_name" content={props.title} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={''} />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
            <link rel="shortcut icon" href={"https://takurinton.dev/me.jpeg"} />
            <link rel="apple-touch-icon" href={"https://takurinton.dev/me.jpeg"} />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/atom-one-dark-reasonable.min.css"
            />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            {/* あまりスマートではないので変えたい */}
            <style>
                {`
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
            `}
            </style>
        </head>
    )
}

type Props = {
    children: () => JSX.Element;
    title: string;
    image: string;
    description?: string,
    props?: any;
    data?: any;
}

const Html = (props: Props) => {
    return () => (
        <html lang="ja">
            <Head {...props} />
            <body>
                <div id="main">
                    <props.children {...props.props} />
                </div>
                <script id="json" type="text/plain" data-json={JSON.stringify(props.props)}></script>
                <script async defer src={`${STATIC_FILES}/main.js`} />
            </body>
        </html>
    );
};

export default Html;