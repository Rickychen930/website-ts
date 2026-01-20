/**
 * Application Entry Point
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Handle chunk loading errors (CSS/JS chunks)
const handleChunkError = (event: ErrorEvent) => {
  const error = event.error || event.message;
  const errorString = error?.toString() || "";

  // Check if it's a chunk loading error
  if (
    errorString.includes("Loading chunk") ||
    errorString.includes("Loading CSS chunk") ||
    errorString.includes("Failed to fetch") ||
    event.message?.includes("chunk")
  ) {
    console.warn("Chunk loading error detected, attempting to reload...", {
      error: errorString,
      message: event.message,
    });

    // Clear cache and reload after a short delay
    setTimeout(() => {
      // Clear service worker cache if exists
      if ("serviceWorker" in navigator && "caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }

      // Reload the page
      window.location.reload();
    }, 1000);

    // Prevent default error handling
    event.preventDefault();
    return true;
  }

  return false;
};

// Handle unhandled promise rejections (chunk loading failures)
const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  const reason = event.reason?.toString() || "";

  if (
    reason.includes("Loading chunk") ||
    reason.includes("Loading CSS chunk") ||
    reason.includes("Failed to fetch")
  ) {
    console.warn("Chunk loading promise rejection, attempting to reload...", {
      reason,
    });

    event.preventDefault();

    // Clear cache and reload
    setTimeout(() => {
      if ("serviceWorker" in navigator && "caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
      window.location.reload();
    }, 1000);

    return true;
  }

  return false;
};

// Register error handlers
if (typeof window !== "undefined") {
  window.addEventListener("error", handleChunkError, true);
  window.addEventListener("unhandledrejection", handleUnhandledRejection);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
