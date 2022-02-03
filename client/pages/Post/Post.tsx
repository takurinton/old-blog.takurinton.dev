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

const getPost = (data, id) => {
    const _data = data.getPost;
    if (!_data) {
        // client side routing
        const [res] = useQuery({
            query: POST_QUERY,
            variables: { id },
        });
        const { data, fetching } = res;
        if (!fetching) return data.getPost;
    } else if (_data.id !== Number(id)) {
        // rerender
        const [res] = useQuery({
            query: POST_QUERY,
            variables: { id },
        });
        const { data, fetching } = res;
        if (!fetching) return data.getPost;
    }
}

const getState = (data, d, id) => {
    if (data.getPost) {
        if (data.getPost.id === Number(id)) {
            return data.getPost;
        }
    }
    if (d === undefined) {
        return initialState;
    }
    return d;
}

export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const { id } = useParams();
    // @ts-ignore
    const data = JSON.parse(Object.values(props)[0].data);
    const d = getPost(data, id);
    const p = getState(data, d, id);

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
