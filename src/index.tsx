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
import { performanceMonitor } from "./utils/performance-monitor";
import { setupGlobalErrorHandlers } from "./utils/error-tracker";
import { analytics, trackPageView } from "./utils/analytics";

// Initialize theme and SEO before rendering
initializeTheme();
initializeSEO();

// Initialize analytics and track initial page view
if (
  analytics.isEnabled() &&
  typeof window !== "undefined" &&
  typeof document !== "undefined"
) {
  trackPageView(window.location.pathname, document.title);
}

// Initialize performance monitoring (development only)
if (process.env.NODE_ENV === "development") {
  performanceMonitor.initialize();
}

// Setup global error handlers (production)
if (process.env.NODE_ENV === "production") {
  setupGlobalErrorHandlers();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
