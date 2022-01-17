import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "ingred-ui";
import { App } from './App';
import { Category } from "./components/Button/Category";

customElements.define('category-content', Category);

const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
ReactDOM.hydrate(
    <BrowserRouter>
        <App props={json} />
    </BrowserRouter>,
    document.getElementById("main")
);