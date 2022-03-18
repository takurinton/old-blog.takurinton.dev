import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin: 50px auto;
`;

export const Heading = styled.div`
  text-align: center;
  width: 100%;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.palette.secoundary.main};
  text-decoration: none;
  font-weight: 800;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
