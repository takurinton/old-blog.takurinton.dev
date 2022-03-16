import { Flex, Spacer } from "ingred-ui";
import React, { useCallback } from "react";
import { HeaderContainer, HeaderNav, HeaderTitle } from "./styled";
import { A, Link } from "../utils/styled";
import { useRecoilState } from "recoil";
import { externalLinksState, postsState } from "../../utils/recoil/atom";

// S3_DOMAIN を IS_PROD のように使うな
const SERVER_DOMAIN = process.env.S3_DOMAIN
  ? "https://wip-blog-takurinton-dev.vercel.app/"
  : "http://localhost:3001";
export default function Header() {
  const [externalLinks, setExternalLinks] = useRecoilState(externalLinksState);

  const handleMouseEnterExternalLinks = useCallback(() => {
    if (externalLinks.length === 0) {
      fetch(`${SERVER_DOMAIN}/external.json`)
        .then((res) => res.json())
        .then((json) => {
          setExternalLinks(json);
        });
    }
  }, []);

  return (
    <HeaderContainer>
      <Flex display="flex" height={`80px`} justifyContent="space-between">
        <Flex display="flex" alignItems="center">
          <HeaderTitle>
            <Link to="/">blog.takurinton.dev</Link>
          </HeaderTitle>
        </Flex>
        <Flex
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <HeaderNav>
            <A href="/rss.xml">RSS</A>
          </HeaderNav>
          <Spacer pl={3} />
          <HeaderNav onMouseEnter={handleMouseEnterExternalLinks}>
            <Link to="/external">External</Link>
          </HeaderNav>
        </Flex>
      </Flex>
    </HeaderContainer>
  );
}
