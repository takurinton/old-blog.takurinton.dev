import { Typography } from "ingred-ui";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  top: 0;
  left: auto;
  right: 0;
  margin: auto;
  z-index: ${({ theme }) => theme.depth.appBar};
  width: 70%;
`;

export const Title = styled(Typography)`
  font-size: 2rem;
`;

export const Nav = styled(Typography)`
  font-size: 1.2rem;
`;