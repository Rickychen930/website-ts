import React, { Component, ErrorInfo, ReactNode } from "react";
import "../../../assets/css/error-boundary.css";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - Catches React errors and displays fallback UI
 * Follows React Error Boundary pattern
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || "An unexpected error occurred";
      const errorName = this.state.error?.name || "Error";

      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary-content">
            <div className="error-boundary-icon" aria-hidden="true" role="img" aria-label="Error icon">
              ⚠️
            </div>
            <h1 className="error-boundary-title" id="error-boundary-title">
              {errorName}
            </h1>
            <p className="error-boundary-message" id="error-boundary-message">
              {errorMessage}
            </p>
            <p className="error-boundary-help-text">
              We're sorry, but something unexpected happened. Please try one of the options below.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-boundary-stack" aria-label="Error stack trace">
                  <code>{this.state.error.toString()}</code>
                  {this.state.error.stack && (
                    <code className="error-boundary-stack-trace">
                      {this.state.error.stack}
                    </code>
                  )}
                </pre>
              </details>
            )}
            <div className="error-boundary-actions" role="group" aria-label="Error recovery actions">
              <button
                className="error-boundary-button"
                onClick={this.handleReset}
                type="button"
                aria-describedby="error-boundary-message"
              >
                Try Again
              </button>
              <button
                className="error-boundary-button error-boundary-button-secondary"
                onClick={() => window.location.reload()}
                type="button"
                aria-describedby="error-boundary-message"
              >
                Reload Page
              </button>
              <button
                className="error-boundary-button error-boundary-button-tertiary"
                onClick={() => window.history.back()}
                type="button"
                aria-describedby="error-boundary-message"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

