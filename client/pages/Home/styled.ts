import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin: 50px auto;
`;

export const Heading = styled.div`
  text-align: center;
  width: 100%;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 800;
`;

export const Label = styled.span`
  padding: 5px 10px 6px;
  background: ${({ theme }) => theme.palette.secoundary.main};
  color: ${({ theme }) => theme.palette.colors.white};
  text-decoration: none;
  border-radius: 2px;
  font-weight: 800;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const PageContainer = styled.div`
  margin: 20px auto 10%;
  position: relative;
`;

export const PrevButton = styled.span`
  position: absolute;
  left: 10px;
`;

export const NextButton = styled.span`
  position: absolute;
  right: 10px;
`;
