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

app.get('/', async (_, res) => {
    try {
        const response = await fetch(`https://api.takurinton.com/blog/v1`);
        const _renderd = render({
            url: '/',
            title: 'Home | たくりんとんのブログ',
            description: 'Home | たくりんとんのブログ',
            image: 'https://takurinton.dev/me.jpeg',
            props: await response.json(),
        });
        res.setHeader('Content-Type', 'text/html')
        const renderd = '<!DOCTYPE html>' + _renderd;
        res.send(renderd);
    } catch (e) {
        console.log(e)
        res.setHeader('Content-Type', 'text/html')
        res.send(e)
    }
});

app.get('/about', async (req, res) => {
    try {
        const _renderd = render({
            url: '/about',
            title: 'about | たくりんとんのブログ',
            description: `about | たくりんとんのブログ`,
            image: 'https://takurinton.dev/me.jpeg',
            props: undefined,
        });
        res.setHeader('Content-Type', 'text/html')
        const renderd = '<!DOCTYPE html>' + _renderd;
        res.send(renderd);
    } catch (e) {
        console.log(e)
        res.setHeader('Content-Type', 'text/html')
        res.send(e)
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await fetch(`https://api.takurinton.com/blog/v1/post/${id}`);
        const json = await response.json();
        const _renderd = render({
            url: '/about',
            title: json.title,
            description: `${json.title} | たくりんとんのブログ`,
            image: 'https://takurinton.dev/me.jpeg',
            props: json,
        });
        res.setHeader('Content-Type', 'text/html')
        const renderd = '<!DOCTYPE html>' + _renderd;
        res.send(renderd);
    } catch (e) {
        console.log(e)
        res.setHeader('Content-Type', 'text/html')
        res.send(e)
    }
});