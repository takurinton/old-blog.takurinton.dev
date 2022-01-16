import { Flex, Spacer, Typography } from "ingred-ui";
import React, { useCallback } from "react";
import { HeaderContainer, HeaderNav, HeaderTitle } from './styled';
import { A, Link } from "../utils/styled";
import { useRecoilState } from "recoil";
import { externalLinksState, postsState } from "../../utils/recoil/atom";

export default function Header(props: any) {
    const [posts, setPosts] = useRecoilState(postsState);
    const [externalLinks, setExternalLinks] = useRecoilState(externalLinksState);

    const handleMouseEnterHome = useCallback(() => {
        const isServerSideRenderingComponent = props.results !== undefined;
        if (!isServerSideRenderingComponent && posts.results.length !== 5) {
            fetch('https://api.takurinton.com/blog/v1/')
                .then(res => res.json())
                .then(json => {
                    setPosts(json);
                })
        }
    }, []);

    const handleMouseEnterExternalLinks = useCallback(() => {
        const isServerSideRenderingComponent = props.results !== undefined;
        if (!isServerSideRenderingComponent && posts.results.length !== 5) {
            fetch('http://localhost:3001/external.json')
                .then(res => res.json())
                .then(json => {
                    setExternalLinks(json);
                })
        }
    }, []);

    return (
        <HeaderContainer>
            <Flex
                display="flex"
                height={`80px`}
                justifyContent="space-between"
            >
                <Flex display="flex" alignItems="center">
                    <HeaderTitle
                        onMouseEnter={handleMouseEnterHome}
                    >
                        <Link to='/'>blog.takurinton.dev</Link>
                    </HeaderTitle>
                </Flex>
                <Flex
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexGrow={1}
                >
                    <HeaderNav>
                        <A href='/rss.xml'>RSS</A>
                    </HeaderNav>
                    <Spacer pl={3} />
                    <HeaderNav
                        onMouseEnter={handleMouseEnterExternalLinks}
                    >
                        <Link to='/external'>External</Link>
                    </HeaderNav>
                </Flex>
            </Flex>
        </HeaderContainer>
    )
}