import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 60%;
  margin: 50px auto;
`;

export const Label = styled(Link)`
  padding: 5px 10px 6px;
  background-color: none;
  color: ${({ theme }) => theme.palette.colors.black.main};
  text-decoration: none;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  font-weight: 200;
  transition: all 0.2s ease-out;
  &:hover {
    color: ${({ theme }) => theme.palette.colors.white.main};
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
