import React, { useEffect } from "react";
import { Layout } from "../../Layout";
import {
  Container,
  PageContainer,
  PrevButton,
  NextButton,
  Label,
} from "./styled";
import { Link } from "../../components/utils/styled";
import { datetimeFormatter } from "../../../shared/utils/datetimeFormatter";
import { getPosts } from "./internal/getPosts";
import { getDataFromHash } from "../../utils/getHashByData";
import { useQuery } from "./internal/useQuery";
import { useLocation } from "react-router";
import { Flex, Typography } from "@takurinton/ingred-ui";

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

export const Home: React.FC<{ props: Props }> = Layout(({ props }) => {
  const query = useQuery();
  const { pathname } = useLocation();
  const isServer = typeof window === "undefined";

  const pages = query.get("page") ?? 1;
  const category = query.get("category") ?? "";
  const data = getDataFromHash(props, isServer);
  const posts = isServer ? data.getPosts : getPosts(data, { pages, category });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isServer)
      document.querySelector("title").innerText = "Home | たくりんとんのブログ";
  }, [pathname, query]);

  return (
    <Container>
      <Typography align="center" component="h1" weight="bold" size="xxxxxxl">
        全ての投稿一覧
      </Typography>
      {posts.results.map((p) => (
        <Flex key={p.id}>
          <Typography weight="bold" component="h2" size="xxxxl">
            <Link to={`/post/${p.id}`}>{p.title}</Link>
          </Typography>
          <Link to={`/?category=${p.category}`}>
            <Label>{p.category}</Label>
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
      <PageContainer>
        {posts.previous === posts.current ? (
          <></>
        ) : (
          <Link
            to={
              posts.category === ""
                ? `/?page=${posts.previous}`
                : `/?page=${posts.previous}&category=${posts.category}`
            }
          >
            <PrevButton>
              <Label>前へ</Label>
            </PrevButton>
          </Link>
        )}
        {posts.next === posts.current ? (
          <></>
        ) : (
          <Link
            to={
              posts.category === ""
                ? `/?page=${posts.next}`
                : `/?page=${posts.next}&category=${posts.category}`
            }
          >
            <NextButton>
              <Label>次へ</Label>
            </NextButton>
          </Link>
        )}
      </PageContainer>
    </Container>
  );
});
