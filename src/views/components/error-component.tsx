import React, { PureComponent, ReactNode } from "react";
import "../../assets/css/main-page.css";

/**
 * ErrorComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface ErrorComponentProps {
  error: string | null;
  retryCount?: number;
  maxRetries?: number;
  onRetry?: () => void;
  className?: string;
}

/**
 * ErrorComponent - Reusable Error State Component
 * Follows Single Responsibility Principle (SRP) - Only handles error display
 * Follows OOP principles - PureComponent for performance
 * Follows DRY principle - Reusable across the application
 * Follows Open/Closed Principle (OCP) - Extensible via props
 */
export class ErrorComponent extends PureComponent<ErrorComponentProps> {
  static defaultProps: Partial<ErrorComponentProps> = {
    retryCount: 0,
    maxRetries: 3,
    onRetry: undefined,
    className: "",
  };

  /**
   * Handle retry button click
   */
  private handleRetry = (): void => {
    const { onRetry } = this.props;
    if (onRetry) {
      onRetry();
    }
  };

  /**
   * Render error icon
   */
  private renderIcon(): ReactNode {
    return <div className="error-icon" aria-hidden="true">⚠️</div>;
  }

  /**
   * Render error title
   */
  private renderTitle(): ReactNode {
    return <h2 className="error-title">Unable to Load Profile</h2>;
  }

  /**
   * Render error message
   */
  private renderMessage(): ReactNode {
    const { error } = this.props;
    return (
      <p className="error-message">
        {error || "An unexpected error occurred"}
      </p>
    );
  }

  /**
   * Render retry info if applicable
   */
  private renderRetryInfo(): ReactNode {
    const { retryCount = 0, maxRetries = 3 } = this.props;

    if (retryCount > 0 && retryCount < maxRetries) {
      return (
        <p className="error-retry-info">
          Retrying... ({retryCount}/{maxRetries})
        </p>
      );
    }

    return null;
  }

  /**
   * Render retry button
   */
  private renderRetryButton(): ReactNode {
    const { onRetry } = this.props;

    if (!onRetry) return null;

    return (
      <button
        className="error-retry-button"
        onClick={this.handleRetry}
        type="button"
      >
        Try Again
      </button>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { className } = this.props;
    const containerClass = `main-page-error ${className || ""}`.trim();

    return (
      <div className={containerClass}>
        <div className="error-content">
          {this.renderIcon()}
          {this.renderTitle()}
          {this.renderMessage()}
          {this.renderRetryInfo()}
          {this.renderRetryButton()}
        </div>
      </div>
    );
  }
}

export default ErrorComponent;

