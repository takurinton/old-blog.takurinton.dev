import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Label } from "./styled";
import { Link } from "../../components/utils/styled";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { getPosts } from "./internal/getPosts";
import { useQuery } from "./internal/useQuery";
import { useLocation } from "react-router";
import { Flex, Typography, Pager } from "@takurinton/ingred-ui";

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

export const Home: React.FC<{ props: Props }> = ({ props }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isServer = typeof window === "undefined";

  const pages = query.get("page") ?? 1;
  const category = query.get("category") ?? "";

  const posts = getPosts({
    variables: { pages, category },
    isServer,
    serverData: props,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isServer) {
      if (category !== "") {
        document.querySelector(
          "title"
        ).innerText = `"${category}" の記事 | たくりんとんのブログ`;
      } else {
        document.querySelector("title").innerText =
          "Home | たくりんとんのブログ";
      }
    }
  }, [pathname, query]);

  return (
    <Container>
      <Typography align="center" component="h1" weight="bold" size="xxxxxxl">
        {category !== "" ? `"${category}" の記事` : "すべての記事"}
      </Typography>
      {posts.results.map((p) => (
        <Flex key={p.id}>
          <Typography weight="bold" component="h2" size="xxxxl">
            <Link to={`/post/${p.id}`}>{p.title}</Link>
          </Typography>
          <Link to={`/?category=${p.category}`}>
            <Label>#{p.category}</Label>
          </Link>
          <Typography weight="bold" component="p" size="xl">
            {datetimeFormatter(p.pub_date)}
          </Typography>
          <Typography component="p" size="xl">
            {p.contents}
          </Typography>
          <hr />
        </Flex>
      ))}
      <Flex
        style={{ width: "fit-content", margin: "0 auto", padding: "20px 0 0" }}
      >
        <Pager
          per={1}
          total={posts.last}
          index={Number(pages)}
          onClick={(index) => {
            posts.category === ""
              ? navigate(`/?page=${index}`)
              : navigate(`/?page=${index}&category=${posts.category}`);
          }}
        />
      </Flex>
    </Container>
  );
};
