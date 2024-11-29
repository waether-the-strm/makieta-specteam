import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const basename = import.meta.env.PROD ? "/makieta-specteam" : "/";

  hydrateRoot(
    rootElement,
    <StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

window.onload = () => {
  console.log("Window loaded");
  console.log("Root content:", document.getElementById("root")?.innerHTML);
};
