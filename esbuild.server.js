import { build } from "esbuild";

build({
    entryPoints: ['./server/index.ts'],
    minify: true,
    bundle: true,
    target: "es2020",
    platform: "node",
    outdir: './dist/server',
    tsconfig: './tsconfig.json',
    external: ['./node_modules'],
});