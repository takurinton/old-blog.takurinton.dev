import { Typography } from "ingred-ui";
import { marked } from 'marked';
import React from "react";
import { useParams } from "react-router";
import highlightjs from 'highlight.js';
import { Layout } from "../../Layout";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./syntaxHighlight";
import { useQuery } from "urql";
import { POST_QUERY } from "../../../shared/graphql/query/post";

type Props = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

const initialState = {
    id: 0,
    title: '',
    contents: '',
    category: '',
    pub_date: '',
}

export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const { id } = useParams();
    const [res] = useQuery({
        query: POST_QUERY,
        variables: { id },
    });

    // @ts-ignore
    const data = JSON.parse(Object.values(props)[0].data);

    const p = typeof window === 'undefined' ?
        data.getPost :
        res.fetching ?
            initialState :
            res.data.getPost;

    return (
        <Container>
            <Typography size='xxxxxl' weight='bold' align='center'>{p.title}</Typography>
            <Typography size='xl' weight='bold' align='right'><Category to={`/?category=${p.category}`}>{p.category}</Category></Typography>
            <Typography size='xxl' weight='bold' align='right'>{datetimeFormatter(p.pub_date)}</Typography>
            <div>
                {
                    StringToHtml(
                        marked.parse(p.contents, {
                            renderer: markdownStyle(),
                            highlight: (code, lang) => {
                                return highlightjs.highlightAuto(code, [lang]).value;
                            }
                        })
                    )
                }
            </div>
        </Container>
    )
});

const StringToHtml = (content) => {
    return (
        <span dangerouslySetInnerHTML={{ __html: content }}></span>
    );
}
