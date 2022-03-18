import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin: 50px auto;
`;

export const Label = styled.span`
  padding: 5px 10px 6px;
  background: ${({ theme }) => theme.palette.secondary.main}};
  color: ${({ theme }) => theme.palette.colors.white.main}};
  text-decoration: none;
  border-radius: 2px;
  font-weight: 800;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main}};
  }
`;

export const PageContainer = styled.div`
  margin: 20px auto 10%;
  position: relative;
`;

export const PrevButton = styled.span`
  position: absolute;
  left: 10px;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.colors.white.main};
`;

export const NextButton = styled.span`
  position: absolute;
  right: 10px;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.colors.white.main};
`;
