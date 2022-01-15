import React from "react";
import { Typography } from "ingred-ui";
import { Layout } from '../../Layout';
import { Container, Heading, Link } from "./styled";
import { datetimeFormatter } from "../../utils/datetimeFormatter";

export const External: React.FC<any> = Layout(({ props }) => {
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
                props.map(p => (
                    <div key={p.url}>
                        <h2><Link href={p.url} target="_blank">{p.title}</Link></h2>
                        <Typography weight='bold' size='xl'>{formatDate(p.date)}</Typography>
                        <p>{p.content}</p>
                        <hr />
                    </div>
                ))
            }
        </Container>
    )
})