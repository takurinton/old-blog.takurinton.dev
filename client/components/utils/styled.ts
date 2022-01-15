import { Link as ReactRouterLink } from 'react-router-dom';
import styled from "styled-components";

export const Link = styled(ReactRouterLink)`
  color: #222222;
  text-decoration: none;
    &:hover {
      color: #ff69b4;
  }
`;

export const A = styled.a`
color: #222222;
  text-decoration: none;
    &:hover {
      color: #ff69b4;
  }
`;