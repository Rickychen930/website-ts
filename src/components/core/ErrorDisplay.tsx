/**
 * ErrorDisplay - Enhanced Error Display Component
 * Displays errors with retry mechanisms and actionable messages
 * 
 * Principles:
 * - SRP: Single responsibility for error display
 * - Accessibility: ARIA labels and semantic HTML
 */

import React from 'react';
import './ErrorDisplay.css';

export interface IErrorDisplayProps {
  title?: string;
  message: string;
  error?: Error | null;
  onRetry?: () => void;
  onReload?: () => void;
  retryLabel?: string;
  reloadLabel?: string;
  className?: string;
}

interface IErrorDisplayState {
  retryCount: number;
  isRetrying: boolean;
}

/**
 * ErrorDisplay Component
 * Enhanced error display with retry functionality
 */
export class ErrorDisplay extends React.Component<IErrorDisplayProps, IErrorDisplayState> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: IErrorDisplayProps) {
    super(props);
    this.state = {
      retryCount: 0,
      isRetrying: false,
    };
  }

  componentWillUnmount(): void {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  private handleRetry = (): void => {
    const { onRetry } = this.props;
    if (!onRetry) return;

    this.setState((prevState) => ({
      retryCount: prevState.retryCount + 1,
      isRetrying: true,
    }));

    // Exponential backoff: 1s, 2s, 4s, etc.
    const delay = Math.min(1000 * Math.pow(2, this.state.retryCount), 10000);
    
    this.retryTimeout = setTimeout(() => {
      onRetry();
      this.setState({ isRetrying: false });
    }, delay);
  };

  private handleReload = (): void => {
    const { onReload } = this.props;
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  private getActionableMessage(message: string): string {
    // Check for network errors
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    // Check for timeout errors
    if (message.toLowerCase().includes('timeout')) {
      return 'The request took too long. Please try again in a moment.';
    }

    // Check for server errors
    if (message.toLowerCase().includes('server') || message.toLowerCase().includes('500')) {
      return 'Our servers are experiencing issues. Please try again later.';
    }

    // Default message
    return message || 'An unexpected error occurred. Please try again.';
  }

  render(): React.ReactNode {
    const {
      title = 'Something went wrong',
      message,
      error,
      retryLabel = 'Try Again',
      reloadLabel = 'Reload Page',
      className = '',
    } = this.props;
    const { retryCount, isRetrying } = this.state;

    const actionableMessage = this.getActionableMessage(message);

    return (
      <div className={`error-display ${className}`} role="alert" aria-live="assertive">
        <div className="error-display__container">
          <div className="error-display__icon" aria-hidden="true">
            ⚠️
          </div>
          <h2 className="error-display__title">{title}</h2>
          <p className="error-display__message">{actionableMessage}</p>
          
          {error && process.env.NODE_ENV === 'development' && (
            <details className="error-display__details">
              <summary className="error-display__summary">Technical Details</summary>
              <pre className="error-display__stack">{error.stack || error.message}</pre>
            </details>
          )}

          {retryCount > 0 && (
            <p className="error-display__retry-info">
              Retry attempt: {retryCount}
            </p>
          )}

          <div className="error-display__actions">
            {this.props.onRetry && (
              <button
                className="error-display__button error-display__button--primary"
                onClick={this.handleRetry}
                disabled={isRetrying}
                type="button"
                aria-label={retryLabel}
              >
                {isRetrying ? 'Retrying...' : retryLabel}
              </button>
            )}
            <button
              className="error-display__button error-display__button--secondary"
              onClick={this.handleReload}
              type="button"
              aria-label={reloadLabel}
            >
              {reloadLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorDisplay;
