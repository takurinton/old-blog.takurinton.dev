import linaria from '@linaria/esbuild';
import esbuild from 'esbuild';

const prod = process.env.NODE_ENV === 'production';

esbuild
    .build({
        entryPoints: {
            main: './client/main.tsx',
            'pages/home': './client/pages/Home/index.tsx',
            'pages/post': './client/pages/Post/index.tsx',
            'pages/external': './client/pages/External/index.tsx',
        },
        outdir: './dist/client',
        bundle: true,
        minify: prod,
        platform: "browser",
        plugins: [
            linaria.default({
                sourceMap: prod,
            }),
        ],
        watch: !prod,
    });