import { Typography } from "ingred-ui";
import { marked } from 'marked';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import highlightjs from 'highlight.js';
import { Layout } from "../../Layout";
import { datetimeFormatter } from "../../utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./syntaxHighlight";

type Props = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const [state, setState] = useState<Props>({ pub_date: 'yyyy-mm-dd-xxxxxxx', contents: '' } as Props);

    const { id } = useParams();
    const isServerSideRenderingComponent = props.id !== undefined && props.id === Number(id);
    const p = isServerSideRenderingComponent ? props : state;
    useEffect(() => {
        if (!isServerSideRenderingComponent) {
            fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
                .then(res => res.json())
                .then(data => setState(data));
        } else {
            const data = JSON.parse(document.getElementById('json').getAttribute('data-json'));
            setState(data);
        }
    }, []);

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
