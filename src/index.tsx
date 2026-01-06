import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/tokens.css";
import "./index.css";
import App from "./App";
import { initializeTheme } from "./utils/theme";
import { initializeSEO } from "./utils/seo";

// Initialize theme and SEO before rendering
initializeTheme();
initializeSEO();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
