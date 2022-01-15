import styled from "styled-components";

export const HeaderContainer = styled.div`
  top: 0;
  left: auto;
  right: 0;
  margin: auto;
  z-index: ${({ theme }) => theme.depth.appBar};
  width: 70%;
`;
