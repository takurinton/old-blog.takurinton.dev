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

app.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await fetch(`https://api.takurinton.com/blog/v1/post/${id}`);
        const json = await response.json();
        const _renderd = render({
            url: `/post/${id}`,
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


app.get('/rss.xml', async (req, res) => {
    try {
        const rss = fetch('https://api.takurinton.com/blog/v1/rss').then((res) => {
            return res.json().then((json) => (
                `<?xml version="1.0" encoding="UTF-8"?>
        <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
        <atom:link href="https://blog.takurinton.dev/rss.xml" rel="self" type="application/rss+xml" />
        <title>たくりんとん</title>
        <link>https://blog.takurinton.dev</link>
        <description>たくりんとんのブログです</description>
        <language>en</language>
        <managingEditor>takurinton@takurinton.com (takurinton)</managingEditor>
        <webMaster>takurinton@takurinton.com (takurinton)</webMaster>
        <image>
            <url>https://takurinton.dev/me.jpeg</url>
            <title>たくりんとん</title>
            <link>https://blog.takurinton.dev</link>
            <width>32</width>
            <height>32</height>
        </image>
        ${json.map((content) => `
            <item>
            <title>${content.title} | たくりんとんのブログ</title>
            <link>https://blog.takurinton.dev/post/${content.id}</link>
            <pubDate>${new Date(content.pub_date).toUTCString()}</pubDate>
            <description>${content.contents.slice(0, 200)}...</description>
            <guid>https://blog.takurinton.dev/post/${content.id}</guid>
            </item>`).join('')}
        </channel>
        </rss>`)
            );
        });
        res.setHeader('cache-control', 's-maxage=86400, stale-while-revalidate')
        res.setHeader('Content-Type', 'pplication/xml;charset=UTF-8')
        res.send(rss);
    } catch (e) {
        console.log(e)
        res.setHeader('Content-Type', 'text/html')
        res.send(e)
    }
});
