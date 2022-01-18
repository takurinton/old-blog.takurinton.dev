import React, { useCallback, useEffect, useRef } from "react";
import { Typography } from "ingred-ui";
import { Layout } from "../../Layout";
import { Heading, Container } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../utils/datetimeFormatter';
import { useRecoilState } from "recoil";
import { postsState, postState } from '../../utils/recoil/atom';
import { Wrapper } from "../../components/wc/Wrapper";

type Props = {
    current: number;
    next: number;
    previous: number;
    category: string;
    results: Post[];
};

type Post = {
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

export const Home: React.FC<{ props: Props }> = Layout(({ props }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [posts, setPosts] = useRecoilState(postsState);
    const [post, setPost] = useRecoilState(postState);
    const isServerSideRenderingComponent = props.results !== undefined;
    const p = isServerSideRenderingComponent ? props : posts;
    useEffect(() => {
        if (!isServerSideRenderingComponent && posts.results.length !== 5) {
            fetch('https://api.takurinton.com/blog/v1/')
                .then(res => res.json())
                .then(json => {
                    setPosts(json);
                })
        }
    }, []);

    // web components のつなぎこみ
    useEffect(() => {
        const fontSize = {
            h1: '2rem',
            h2: '1.6rem',
            h3: '1.2rem',
            p: '1rem',
        }

        const tag = titleRef.current?.getAttribute('tag');
        const shadow = document.createElement(tag);
        const weight = titleRef.current?.getAttribute('weight');
        const text = titleRef.current?.getAttribute('text');

        shadow.innerHTML = `
            <style>
                ${tag} {
                    font-size: ${fontSize[tag]};
                    color: #222222;
                    font-weight: ${weight === 'bold' ? 800 : 200};
                }
            </style>

            ${text}
        `;
        titleRef.current?.attachShadow({ mode: 'open' }).appendChild(shadow);
    }, []);

    const handleMouseEnter = useCallback((id) => {
        if (post.filter(p => p.id === id).length === 0) {
            fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
                .then(res => res.json())
                .then(json => {
                    setPost([...post, json]);
                })
        }
    }, [post]);

    return (
        <Container>
            <Heading>
                {/* @ts-ignore */}
                <span ref={titleRef} text='全ての投稿一覧' weight='bold' tag='h1' />
                {/* <typography-text weight='bold' tag='h1' text='全ての投稿一覧'>
                    <h1>
                        <span slot='typography-text'>
                            全ての投稿一覧
                        </span>
                    </h1>
                </typography-text> */}
            </Heading>
            {
                p.results.map(p => (
                    <div key={p.id}>
                        <h2 onMouseEnter={() => handleMouseEnter(p.id)}><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <Link to={`/?category=${p.category}`}>
                            <span>
                                <category-content text={p.category}>
                                    <span slot="catepory-content">{p.category}</span>
                                </category-content>
                            </span>
                        </Link>
                        <Typography weight='bold' size='xl'>{datetimeFormatter(p.pub_date)}</Typography>
                        <p>{p.contents}</p>
                        <hr />
                    </div>
                ))
            }
        </Container >
    )
});
