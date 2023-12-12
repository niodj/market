import { createRoot } from "react-dom/client";
import "./index.css";
import {  HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
