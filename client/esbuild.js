import { build } from "esbuild";

const isProd = process.env.NODE_ENV === 'production';

build({
    entryPoints: ['./client/pages/Home/index.tsx'],
    bundle: true,
    target: "es2020",
    platform: "browser",
    outdir: './dist/client',
    tsconfig: './tsconfig.json',
    external: ['./node_modules'],
    minify: isProd,
    watch: !isProd,
});