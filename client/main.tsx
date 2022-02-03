import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from './App';

(() => {
    const json = JSON.parse(document.getElementById('data').getAttribute('data-json'));
    ReactDOM.hydrate(
        <BrowserRouter>
            <App props={json} />
        </BrowserRouter>,
        document.getElementById("main")
    );
})();
