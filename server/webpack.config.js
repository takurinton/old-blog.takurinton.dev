// const path = require('path');
// const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import path from 'path';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
    mode: process.env.NODE_ENV ?? 'development',
    target: 'node',
    entry: {
        client: './server/index.ts'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            configFile: "tsconfig.json",
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.css.ts']
    },
    plugins: [
        new VanillaExtractPlugin(),
        new MiniCssExtractPlugin()
    ],
    output: {
        filename: 'index.js',
        // path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        // static: {
        // directory: 'dist',
        // },
        compress: true,
        port: 3001,
    },
};

export default config;
