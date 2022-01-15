import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "ingred-ui";
import { Layout } from "../../Layout";
import { Heading, Container, Category } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../utils/datetimeFormatter';
import { useRecoilState } from "recoil";
import { postsState, postState } from '../../utils/recoil/atom';

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
    const [posts, setPosts] = useRecoilState(postsState);
    const [post, setPost] = useRecoilState(postState);
    const isServerSideRenderingComponent = props.results !== undefined;
    const p = isServerSideRenderingComponent ? props : posts;
    useEffect(() => {
        if (props.results === undefined) {
            fetch('https://api.takurinton.com/blog/v1/')
                .then(res => res.json())
                .then(json => {
                    setPosts(json);
                })
        }
    }, []);

    const handleMouseEnter = useCallback((id) => {
        if (post.filter(p => p.id === id).length === 0) {
            fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
                .then(res => res.json())
                .then(json => {
                    setPost([...post, json]);
                    document.getElementById('json').setAttribute('data-json', JSON.stringify(json))
                })
        }
    }, [post]);

    return (
        <Container>
            <Heading>
                <Typography weight='bold' size='xxxxxxl' color='#222222'>全ての投稿一覧</Typography>
            </Heading>
            {
                p.results.map(p => (
                    <div key={p.id}>
                        <h2 onMouseEnter={() => handleMouseEnter(p.id)}><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <Category to={`/?category=${p.category}`}>{p.category}</Category>
                        <Typography weight='bold' size='xl'>{datetimeFormatter(p.pub_date)}</Typography>
                        <p>{p.contents}</p>
                        <hr />
                    </div>
                ))
            }
        </Container>
    )
});
