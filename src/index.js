import React from "react";
import ReactDOM from "react-dom/client"; // Используем react-dom/client
import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

const rootView = document.getElementById("root");

if (rootView) {
  ReactDOM.createRoot(rootView).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
