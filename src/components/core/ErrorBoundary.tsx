/**
 * ErrorBoundary - Enhanced Error Boundary Component
 * Best practices for error handling and user experience
 * 
 * Features:
 * - Comprehensive error catching
 * - User-friendly error messages
 * - Error reporting
 * - Recovery options
 * - Accessibility support
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { logError } from '../../utils/logger';

export interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  onReset?: () => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

/**
 * ErrorBoundary Component
 * Catches errors in child components and displays fallback UI
 */
export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private resetTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<IErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    logError('ErrorBoundary caught an error:', {
      ...error,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
    }, 'ErrorBoundary');

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error tracking service (e.g., Sentry) in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  componentDidUpdate(
    prevProps: IErrorBoundaryProps,
    prevState: IErrorBoundaryState
  ): void {
    // Reset error state if resetKeys change
    if (
      this.state.hasError &&
      prevProps.resetKeys &&
      this.props.resetKeys &&
      prevProps.resetKeys.some((key, index) => key !== this.props.resetKeys?.[index])
    ) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private resetErrorBoundary = (): void => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleRetry = (): void => {
    this.resetErrorBoundary();
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorDisplay
          title="Something went wrong"
          message={
            this.state.error.message ||
            'An unexpected error occurred. Please try refreshing the page.'
          }
          error={this.state.error}
          onRetry={this.handleRetry}
          errorId={this.state.errorId}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;