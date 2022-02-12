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
  font-size: 2rem;
  color: #222222;
  font-weight: 800;
`;

export const Category = styled.span`
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