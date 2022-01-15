import { Flex, Spacer, Typography } from "ingred-ui";
import React, { useCallback } from "react";
import { HeaderContainer, HeaderTitle } from './styled';
import { A, Link } from "../utils/styled";
import { useRecoilState } from "recoil";
import { postsState } from "../../utils/recoil/atom";

export default function Header(props: any) {
    const [posts, setPosts] = useRecoilState(postsState);
    const handleMouseEnter = useCallback(() => {
        const isServerSideRenderingComponent = props.results !== undefined;
        if (!isServerSideRenderingComponent && posts.results.length !== 5) {
            fetch('https://api.takurinton.com/blog/v1/')
                .then(res => res.json())
                .then(json => {
                    setPosts(json);
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
                        onMouseEnter={handleMouseEnter}
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
                    <Typography weight='bold' size='xl'>
                        <A href='/rss.xml'>RSS</A>
                    </Typography>
                    <Spacer pl={3} />
                    <Typography weight='bold' size='xl'>
                        <Link to='/external'>External</Link>
                    </Typography>
                </Flex>
            </Flex>
        </HeaderContainer>
    )
}