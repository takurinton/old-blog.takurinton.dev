import { Typography } from "ingred-ui";
import { marked } from 'marked';
import React from "react";
import { useParams } from "react-router";
import highlightjs from 'highlight.js';
import { Layout } from "../../Layout";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./syntaxHighlight";
import { useRecoilState } from "recoil";
import { postState } from "../../utils/recoil/atom";

type Props = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const [post, _] = useRecoilState(postState);
    const { id } = useParams();
    const _post = post.find(p => p.id === Number(id));
    const isServerSideRenderingComponent = props.id !== undefined && props.id === Number(id);
    const p = isServerSideRenderingComponent ? props : _post;

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
