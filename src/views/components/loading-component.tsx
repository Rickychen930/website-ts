import React, { PureComponent, ReactNode } from "react";
import "../../assets/css/main-page.css";

/**
 * LoadingComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface LoadingComponentProps {
  message?: string;
  className?: string;
}

/**
 * LoadingComponent - Reusable Loading State Component
 * Follows Single Responsibility Principle (SRP) - Only handles loading display
 * Follows OOP principles - PureComponent for performance
 * Follows DRY principle - Reusable across the application
 */
export class LoadingComponent extends PureComponent<LoadingComponentProps> {
  static defaultProps: Partial<LoadingComponentProps> = {
    message: "Loading profile...",
    className: "",
  };

  /**
   * Render loading spinner
   */
  private renderSpinner(): ReactNode {
    return (
      <div className="loading-spinner" aria-label="Loading">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
    );
  }

  /**
   * Render loading message
   */
  private renderMessage(): ReactNode {
    const { message } = this.props;
    return message ? <p className="loading-text">{message}</p> : null;
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { className } = this.props;
    const containerClass = `main-page-loading ${className || ""}`.trim();

    return (
      <div className={containerClass}>
        {this.renderSpinner()}
        {this.renderMessage()}
      </div>
    );
  }
}

export default LoadingComponent;

