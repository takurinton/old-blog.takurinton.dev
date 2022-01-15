import { Flex, Spacer, Typography } from "ingred-ui";
import React from "react";
import { HeaderContainer } from './styled';
import { A, Link } from "../utils/styled";

export default function Header() {
    return (
        <HeaderContainer>
            <Flex
                display="flex"
                height={`80px`}
                justifyContent="space-between"
            >
                <Flex display="flex" alignItems="center">
                    <Typography
                        weight="bold"
                        size='xxxxl'
                    >
                        <Link to='/'>blog.takurinton.dev</Link>
                    </Typography>
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