import { Flex, Typography } from "@takurinton/ingred-ui";
import { marked } from "marked";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import highlightjs from "highlight.js";
import { Layout } from "../../Layout";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./internal/syntaxHighlight";
import { getPost } from "./internal/getPost";
import { getState } from "./internal/getState";
import { getDataFromHash } from "../../utils/getHashByData";

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
  const isServer = typeof window === "undefined";
  const data = getDataFromHash(props, isServer);
  const d = isServer ? data.getPost : getPost(data, id);
  const p = getState(data, d, id);

  useEffect(() => {
    if (!isServer) document.querySelector("title").innerText = p.title;
  }, [p]);

  return (
    <Container>
      <Typography size="xxxxxl" weight="bold" align="center">
        {p.title}
      </Typography>
      <Typography size="xl" weight="bold" align="right">
        <Category to={`/?category=${p.category}`}>{p.category}</Category>
      </Typography>
      <Typography size="xxl" weight="bold" align="right">
        {datetimeFormatter(p.pub_date)}
      </Typography>
      <Flex>
        {StringToHtml(
          marked.parse(p.contents, {
            renderer: markdownStyle(),
            highlight: (code, lang) => {
              return highlightjs.highlightAuto(code, [lang]).value;
            },
          })
        )}
      </Flex>
    </Container>
  );
});

const StringToHtml = (content) => {
  return <span dangerouslySetInnerHTML={{ __html: content }}></span>;
};
