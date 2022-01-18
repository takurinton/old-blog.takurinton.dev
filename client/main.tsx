import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "ingred-ui";
import { App } from './App';
// import { Category } from "./components/Button/Category";
// import { Typography } from "./components/Typography";

// customElements.define('category-content', Category);
// customElements.define('typography-text', Typography);

const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
ReactDOM.hydrate(
    <BrowserRouter>
        <App props={json} />
    </BrowserRouter>,
    document.getElementById("main")
);