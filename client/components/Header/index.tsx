import { Flex, Spacer } from "ingred-ui";
import React from "react";
import { HeaderContainer, Nav, Title } from './styled';
import { Link } from "../utils/styled";

export default function Header() {
    return (
        <HeaderContainer>
            <Flex
                display="flex"
                height={`80px`}
                justifyContent="space-between"
            >
                <Flex display="flex" alignItems="center">
                    <Spacer pl={3} />
                    <Title
                        weight="bold"
                    >
                        <Link to='/'>blog.takurinton.dev</Link>
                    </Title>
                </Flex>
                <Flex
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexGrow={1}
                >
                    <Nav weight='bold'>
                        <Link to='/rss.xml'>RSS</Link>
                    </Nav>
                    <Spacer pl={2} />
                    <Nav weight='bold'>
                        <Link to='/external'>External</Link>
                    </Nav>
                    <Spacer pl={3} />
                </Flex>
            </Flex>
        </HeaderContainer>
    )
}