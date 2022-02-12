import { build } from "esbuild";
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const isProd = process.env.NODE_ENV === 'production';

const local = build({
    entryPoints: ['./server/index.ts'],
    minify: true,
    bundle: true,
    target: "es2020",
    platform: "node",
    outdir: './dist',
    tsconfig: './tsconfig.json',
    external: ['./node_modules'],
    plugins: [vanillaExtractPlugin()],
    minify: isProd,
})

const prod = () => { }

(() => isProd ? prod : local)();
