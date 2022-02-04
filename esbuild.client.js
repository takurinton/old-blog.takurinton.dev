import { build } from "esbuild";

build({
    entryPoints: ['./client/main.tsx'],
    minify: true,
    bundle: true,
    target: "es2020",
    platform: "browser",
    outdir: './dist/client',
    tsconfig: './tsconfig.json',
    external: ['./node_modules'],
});