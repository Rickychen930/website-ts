/**
 * Application Entry Point
 * Professional Import Structure
 * 
 * Import order:
 * 1. React dependencies
 * 2. CSS (core system first, then app styles)
 * 3. App component
 * 4. Utilities (theme, SEO)
 */

import React from "react";
import ReactDOM from "react-dom/client";

// CSS - Core system first (variables, base, utilities)
import "./index.css";

// App
import App from "./App";

// Utilities
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
