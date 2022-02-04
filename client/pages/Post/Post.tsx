import { Typography } from "ingred-ui";
import { marked } from 'marked';
import React from "react";
import { useParams } from "react-router";
import highlightjs from 'highlight.js';
import { Layout } from "../../Layout";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./internal/syntaxHighlight";
import { getPost } from "./internal/getPost";
import { getState } from "./internal/getState";
import { getHashByData } from "../../utils/getHashByData";

type Props = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};


export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const { id } = useParams();
    const isServer = typeof window === 'undefined';
    const data = getHashByData(props);
    const d = isServer ? data.getPost : getPost(data, id);
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
