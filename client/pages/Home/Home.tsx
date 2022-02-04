import React, { useEffect } from "react";
import { Layout } from "../../Layout";
import { Heading, Container, PageContainer, PrevButton, NextButton } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../../shared/utils/datetimeFormatter';
import { TypographyWrapper } from '../../components/Typography';
import { CategoryWrapper } from "../../components/Button/Category";
import { getPosts } from "./internal/getPosts";
import { getHashByData } from "../../utils/recoil/getHashByData";
import { useQuery } from "./internal/useQuery";
import { useLocation } from "react-router";

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
    const query = useQuery();
    const { pathname } = useLocation();
    const isServer = typeof window === 'undefined';

    const pages = query.get('page') ?? 1;
    const category = query.get('category') ?? '';
    const data = getHashByData(props);
    const posts = isServer ? data.getPosts : getPosts(data, { pages, category });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, query]);

    return (
        <Container>
            <Heading>
                <TypographyWrapper text="全ての投稿一覧" weight="bold" tag="h1" />
            </Heading>
            {
                posts.results.map(p => (
                    <div key={p.id}>
                        <h2><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <Link to={`/?category=${p.category}`}>
                            <CategoryWrapper text={p.category} />
                        </Link>
                        <TypographyWrapper weight='bold' tag="p" text={datetimeFormatter(p.pub_date)}></TypographyWrapper>
                        <p>{p.contents}</p>
                        <hr />
                    </div>
                ))
            }
            <PageContainer>
                {
                    posts.previous === posts.current ? <></> : (
                        <Link to={posts.category === '' ? `/?page=${posts.previous}` : `/?page=${posts.previous}&category=${posts.category}`}>
                            <PrevButton>
                                <CategoryWrapper text={'prev'} />
                            </PrevButton>
                        </Link>
                    )
                }
                {
                    posts.next === posts.current ? <></> : (
                        <Link to={posts.category === '' ? `/?page=${posts.next}` : `/?page=${posts.next}&category=${posts.category}`}>
                            <NextButton>
                                <CategoryWrapper text={'next'} />
                            </NextButton>
                        </Link>
                    )
                }

            </PageContainer>
        </Container >
    )
});
