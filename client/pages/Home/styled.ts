import { Typography } from "ingred-ui";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin: 50px auto;
`;

export const Heading = styled.div`
  text-align: center;
  width: 100%;
`;

export const Category = styled(Link)`
  padding: 5px 10px 6px;
  background: #707070;
  color: white;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 800;
  &:hover {
    background: #ff69b4;
  }
`;
