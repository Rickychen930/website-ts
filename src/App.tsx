/**
 * App - Root Component
 * Main application entry point
 */

import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRoutes from "./routes/app-routes";
import { ErrorDisplay } from "./components/core";
import { logError } from "./utils/logger";

/**
 * ErrorBoundary Component
 * Simple error boundary for the app
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError("App Error:", error, "ErrorBoundary");
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-error-boundary">
          <ErrorDisplay
            title="Application Error"
            message={this.state.error?.message || "An unexpected error occurred"}
            error={this.state.error}
            onRetry={this.handleRetry}
            retryLabel="Reset Application"
            reloadLabel="Reload Page"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * App Component
 * Root application component
 */
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
