import React, { useEffect, useState } from "react";
import { Layout } from "../../Layout";
import { Heading, Container } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../../shared/utils/datetimeFormatter';
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

const initialState = {
    current: 0,
    next: 0,
    preview: 0,
    category: '',
    results: [
        {
            id: 0,
            title: '',
            contents: '',
            category: '',
            pub_date: '',
        }
    ]
}

const getPosts = (data) => {
    if (!data.getPosts) {
        const [res] = useQuery({
            query: POSTS_QUERY,
            variables: { page: 1, category: '' },
        });

        const { data, fetching } = res;
        if (!fetching) return data.getPosts;
    }
}

export const Home: React.FC<{ props: Props }> = Layout(({ props }) => {
    // @ts-ignore
    const data = JSON.parse(Object.values(props)[0].data);
    const d = getPosts(data);
    const p = data.getPosts ?
        data.getPosts.results : d === undefined ?
            initialState.results :
            d.results

    return (
        <Container>
            <Heading>
                <TypographyWrapper text="全ての投稿一覧" weight="bold" tag="h1" />
            </Heading>
            {
                p.map(p => (
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
        </Container >
    )
});
