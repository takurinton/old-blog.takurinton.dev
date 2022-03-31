import { Flex, Typography } from "@takurinton/ingred-ui";
import { marked } from "marked";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import highlightjs from "highlight.js";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { Container, Category } from "./styled";
import { markdownStyle } from "./internal/syntaxHighlight";
import { getPost } from "./internal/getPost";

type Props = {
  __typename: string;
  id: number;
  title: string;
  contents: string;
  category: string;
  pub_date: string;
};

export const Post: React.FC<{ props: Props }> = ({ props }) => {
  const { id } = useParams();
  const isServer = typeof window === "undefined";
  const post = getPost({
    id,
    isServer,
    serverData: props,
  });

  useEffect(() => {
    if (!isServer) document.querySelector("title").innerText = post.title;
  }, [post]);

  return (
    <Container>
      <Typography size="xxxxxl" weight="bold" align="center">
        {post.title}
      </Typography>
      <Typography size="xl" weight="bold" align="right">
        <Category to={`/?category=${post.category}`}>{post.category}</Category>
      </Typography>
      <Typography size="xxl" weight="bold" align="right">
        {datetimeFormatter(post.pub_date)}
      </Typography>
      <Flex>
        {StringToHtml(
          marked.parse(post.contents, {
            renderer: markdownStyle(),
            highlight: (code, lang) => {
              return highlightjs.highlightAuto(code, [lang]).value;
            },
          })
        )}
      </Flex>
    </Container>
  );
};

const StringToHtml = (content) => {
  return <span dangerouslySetInnerHTML={{ __html: content }}></span>;
};
