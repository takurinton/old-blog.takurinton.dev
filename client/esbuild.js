import { build } from "esbuild";
// import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const isProd = process.env.NODE_ENV === 'production';

build({
    entryPoints: ['./client/main.tsx'],
    bundle: true,
    target: "es2020",
    platform: "browser",
    outdir: './dist',
    tsconfig: './tsconfig.json',
    external: ['./node_modules'],
    // plugins: [vanillaExtractPlugin()],
    watch: !isProd,
    minify: isProd,
});