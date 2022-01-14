import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import { render } from './render';

const app = express();
app.listen(3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
        let data;
        switch (true) {
            case url === '/': {
                const res = await fetch('https://api.takurinton.com/blog/v1');
                // const page: string = req.query.page === undefined ? '' : req.query.page;
                // const category: string = req.query.category === undefined ? '' : encodeURI(req.query.category);
                data = {
                    title: 'Home | たくりんとんのブログ',
                    description: 'Home | たくりんとんのブログ',
                    image: 'https://takurinton.dev/me.jpeg',
                    props: await res.json(),
                }
                break;
            }
            case req.params['0'].slice(0, 6) === '/post/': {
                console.log('hoge')
                const id = req.params['0'].slice(7,);
                const res = await fetch(`ttps://api.takurinton.com/blog/v1/post/${id}`);
                const json = await res.json();
                data = {
                    title: json.title,
                    description: `${json.title} | たくりんとんのブログ`,
                    image: 'https://takurinton.dev/me.jpeg',
                    props: await res.json(),
                }
                break;
            }
            case url === '/about': {
                data = {
                    title: 'このサイトについて',
                    description: 'about です',
                    image: 'https://takurinton.dev/me.jpeg',
                }
                break;
            }
            default: {
                data = {
                    title: '404',
                    description: '存在しないページです',
                    image: 'https://takurinton.dev/me.jpeg',
                }
            }
        }

        const _renderd = render({ url, ...data });
        res.setHeader('Content-Type', 'text/html')
        const renderd = '<!DOCTYPE html>' + _renderd;
        res.send(renderd);
    } catch (e) {
        console.log(e)
        res.setHeader('Content-Type', 'text/html')
        res.send(e)
    }
});
