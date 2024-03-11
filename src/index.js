import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

const rootView = document.getElementById("root");

if (rootView) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    rootView
  );
}
