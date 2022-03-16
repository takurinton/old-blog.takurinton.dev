import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

(() => {
  const props = document.getElementById("__RINTON_DATA__").textContent;
  ReactDOM.hydrate(
    <BrowserRouter>
      <App props={props} />
    </BrowserRouter>,
    document.getElementById("__rinton")
  );
})();
