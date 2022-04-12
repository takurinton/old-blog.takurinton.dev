import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

(() => {
  const props = document.getElementById("__RINTON_DATA__").textContent;
  hydrateRoot(
    document.getElementById("__rinton"),
    <BrowserRouter>
      <App props={props} />
    </BrowserRouter>
  );
})();
