import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@takurinton/ingred-ui";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { External } from "./pages/External";
import { Provider } from "../shared/graphql/hooks/context";
import { initUrqlClient } from "../shared/graphql/initUrqlClient";
import Header from "./components/Header";

export const App: React.FC<{
  props: any;
}> = ({ props }): JSX.Element => {
  const theme = createTheme({
    palette: {
      colors: {
        white: {
          main: "white",
        },
        black: {
          main: "#222222",
        },
      },
      primary: {
        highlight: "#F2F9FC",
        light: "#ffbae0",
        main: "#ff69b4",
      },
      secondary: {
        main: "#707070",
      },
    },
  });
  const client = initUrqlClient({});

  return (
    <>
      <Provider value={client}>
        <ThemeProvider theme={theme}>
          <Header {...props} />
          <Routes>
            <Route path="/" element={<Home props={props} />} />
            <Route path="/post/:id" element={<Post props={props} />} />
            <Route path="/external" element={<External props={props} />} />
            <Route path="about" element={<About />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </>
  );
};
