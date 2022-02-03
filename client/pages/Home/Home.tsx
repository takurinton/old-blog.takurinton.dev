import React from "react";
import { Layout } from "../../Layout";
import { Heading, Container } from "./styled";
import { Link } from '../../components/utils/styled';
import { datetimeFormatter } from '../../../shared/utils/datetimeFormatter';
import { TypographyWrapper } from '../../components/Typography';
import { CategoryWrapper } from "../../components/Button/Category";
import { getPosts } from "./internal/getPosts";
import { getHashByData } from "../../utils/recoil/getHashByData";
import { useQuery } from "./internal/useQuery";

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
    const page = query.get('page') ?? 1;
    const category = query.get('category') ?? '';
    const data = getHashByData(props);
    const p = getPosts(data, { page, category });

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
