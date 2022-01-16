import React from "react";
import { Typography } from "ingred-ui";
import { Layout } from '../../Layout';
import { Container, Heading, Link } from "./styled";
import { useRecoilState } from "recoil";
import { externalLinksState } from "../../utils/recoil/atom";

export const External: React.FC<any> = Layout(({ props }) => {
    const [externalLinks, _] = useRecoilState(externalLinksState);
    const isServerSideRenderingComponent = props[0] !== undefined;
    const external = isServerSideRenderingComponent ? props : externalLinks;

    const formatDate = (a) => {
        const date = new Date(a);
        const y = date.getFullYear();
        const m = ('00' + (date.getMonth() + 1)).slice(-2);
        const d = ('00' + date.getDate()).slice(-2);
        return `${y}/${m}/${d}`;
    }

    return (
        <Container>
            <Heading>
                <Typography weight='bold' size='xxxxxxl' color='#222222'>外部に投稿した記事一覧</Typography>
            </Heading>
            {
                external.map(ex => (
                    <div key={ex.url}>
                        <h2><Link href={ex.url} target="_blank">{ex.title}</Link></h2>
                        <Typography weight='bold' size='xl'>{formatDate(ex.date)}</Typography>
                        <p>{ex.content}</p>
                        <hr />
                    </div>
                ))
            }
        </Container>
    )
})