import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? "/makieta-specteam" : "/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
