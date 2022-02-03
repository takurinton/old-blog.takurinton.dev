import React, { useCallback, useEffect } from "react";
import { Layout } from "../../Layout";
import { Heading, Container } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../../shared/utils/datetimeFormatter';
import { useRecoilState } from "recoil";
import { postsState, postState } from '../../utils/recoil/atom';
import { TypographyWrapper } from '../../components/Typography';
import { CategoryWrapper } from "../../components/Button/Category";
import { useQuery } from "urql";
import { POSTS_QUERY } from "../../../shared/graphql/query/posts";

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
    const [res] = useQuery({
        query: POSTS_QUERY,
        variables: { page: 1, category: '' },
    });

    const [posts, setPosts] = useRecoilState(postsState);
    const [post, setPost] = useRecoilState(postState);
    const isServerSideRenderingComponent = props.results !== undefined;
    const p = isServerSideRenderingComponent ? props : res;
    useEffect(() => {
        if (!isServerSideRenderingComponent && posts.results.length !== 5) {
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
                })
        }
    }, [post]);

    return (
        <Container>
            <Heading>
                <TypographyWrapper text="全ての投稿一覧" weight="bold" tag="h1" />
            </Heading>
            {
                res.fetching ? '' : res.data.getPosts.results.map(p => (
                    <div key={p.id}>
                        <h2 onMouseEnter={() => handleMouseEnter(p.id)}><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <Link to={`/?category=${p.category}`}>
                            <CategoryWrapper text={p.category} />
                        </Link>
                        <TypographyWrapper weight='bold' tag="p" text={datetimeFormatter(p.pub_date)}></TypographyWrapper>
                        <p>{p.contents}</p>
                        <hr />
                    </div>
                ))
            }
        </Container >
    )
});
