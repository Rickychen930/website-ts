import React, { PureComponent, ReactNode } from "react";
import LoadingSkeleton from "./loading-skeleton";
import "../../../assets/css/main-page.css";

/**
 * LoadingComponent Props
 * Follows Interface Segregation Principle (ISP)
 */
interface LoadingComponentProps {
  message?: string;
  className?: string;
  useSkeleton?: boolean;
  skeletonVariant?: "text" | "card" | "image" | "circle";
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
    useSkeleton: false,
    skeletonVariant: "card",
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
   * Render skeleton loader
   */
  private renderSkeleton(): ReactNode {
    const { skeletonVariant } = this.props;
    return (
      <div className="main-page-loading-skeleton" role="status" aria-label="Loading content">
        <LoadingSkeleton variant={skeletonVariant} width="100%" height="400px" />
      </div>
    );
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const { className, useSkeleton } = this.props;
    
    if (useSkeleton) {
      return this.renderSkeleton();
    }

    const containerClass = `main-page-loading ${className || ""}`.trim();

    return (
      <div className={containerClass} role="status" aria-label="Loading">
        {this.renderSpinner()}
        {this.renderMessage()}
      </div>
    );
  }
}

export default LoadingComponent;

