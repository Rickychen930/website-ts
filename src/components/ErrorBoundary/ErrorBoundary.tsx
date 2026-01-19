/**
 * Error Boundary - Catches React errors
 * Version 2: Added error boundary for better error handling
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Log to error tracking service (e.g., Sentry, LogRocket)
    if (typeof window !== "undefined" && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundary}>
          <Typography variant="h2" weight="bold">
            Something went wrong
          </Typography>
          <Typography variant="body" color="secondary">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <Button
            onClick={this.handleReset}
            variant="primary"
            className={styles.resetButton}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
