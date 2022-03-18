import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
} from "../shared/@takurinton/ingred-ui/src/themes";
// import { ThemeProvider, createTheme } from "@takurinton/ingred-ui";
import { RecoilRoot } from "recoil";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { External } from "./pages/External";
import { Provider } from "../shared/graphql/hooks/context";
import { initUrqlClient } from "../shared/graphql/initUrqlClient";

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
        main: "#ff69b4",
      },
      secoundary: {
        main: "#707070",
      },
    },
  });
  const client = initUrqlClient({});

  return (
    <>
      <RecoilRoot>
        <Provider value={client}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home props={props} />} />
              <Route path="/post/:id" element={<Post props={props} />} />
              <Route path="/external" element={<External props={props} />} />
              <Route path="about" element={<About />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </RecoilRoot>
    </>
  );
};
