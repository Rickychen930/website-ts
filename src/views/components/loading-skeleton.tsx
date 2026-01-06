/**
 * LoadingSkeleton - Professional Skeleton Loader Component
 * Better UX during loading states
 * 
 * Features:
 * - Multiple skeleton variants (text, card, image, etc.)
 * - Smooth shimmer animation
 * - Accessible (ARIA labels)
 * - Responsive design
 */

import React, { ReactNode } from "react";
import "../../assets/css/loading-skeleton.css";

export interface LoadingSkeletonProps {
  variant?: "text" | "card" | "image" | "circle" | "custom";
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * LoadingSkeleton - Reusable skeleton loader component
 */
export class LoadingSkeleton extends React.PureComponent<LoadingSkeletonProps> {
  static defaultProps: Partial<LoadingSkeletonProps> = {
    variant: "text",
    width: "100%",
    height: "1rem",
    lines: 1,
  };

  private renderSkeleton(): ReactNode {
    const { variant, width, height, lines, className, children } = this.props;

    if (children) {
      return (
        <div className={`skeleton skeleton-custom ${className || ""}`} style={{ width, height }}>
          {children}
        </div>
      );
    }

    switch (variant) {
      case "text":
        return this.renderTextSkeleton(width, height, lines, className);
      case "card":
        return this.renderCardSkeleton(width, height, className);
      case "image":
        return this.renderImageSkeleton(width, height, className);
      case "circle":
        return this.renderCircleSkeleton(width, height, className);
      default:
        return (
          <div
            className={`skeleton skeleton-text ${className || ""}`}
            style={{ width, height }}
            aria-label="Loading content"
            role="status"
          />
        );
    }
  }

  private renderTextSkeleton(
    width?: string | number,
    height?: string | number,
    lines?: number,
    className?: string
  ): ReactNode {
    if (lines && lines > 1) {
      return (
        <div className={`skeleton-text-group ${className || ""}`} aria-label="Loading text content" role="status">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="skeleton skeleton-text"
              style={{
                width: index === lines - 1 ? "80%" : width || "100%",
                height: height || "1rem",
                marginBottom: index < lines - 1 ? "0.5rem" : "0",
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        className={`skeleton skeleton-text ${className || ""}`}
        style={{ width, height }}
        aria-label="Loading text content"
        role="status"
      />
    );
  }

  private renderCardSkeleton(
    width?: string | number,
    height?: string | number,
    className?: string
  ): ReactNode {
    return (
      <div
        className={`skeleton-card ${className || ""}`}
        style={{ width, height }}
        aria-label="Loading card content"
        role="status"
      >
        <div className="skeleton skeleton-image" style={{ width: "100%", height: "200px" }} />
        <div className="skeleton-content">
          <div className="skeleton skeleton-text" style={{ width: "80%", height: "1.5rem", marginBottom: "1rem" }} />
          <div className="skeleton skeleton-text" style={{ width: "100%", height: "1rem", marginBottom: "0.5rem" }} />
          <div className="skeleton skeleton-text" style={{ width: "90%", height: "1rem" }} />
        </div>
      </div>
    );
  }

  private renderImageSkeleton(
    width?: string | number,
    height?: string | number,
    className?: string
  ): ReactNode {
    return (
      <div
        className={`skeleton skeleton-image ${className || ""}`}
        style={{ width, height }}
        aria-label="Loading image"
        role="status"
      />
    );
  }

  private renderCircleSkeleton(
    width?: string | number,
    height?: string | number,
    className?: string
  ): ReactNode {
    const size = width || height || "48px";
    return (
      <div
        className={`skeleton skeleton-circle ${className || ""}`}
        style={{ width: size, height: size, borderRadius: "50%" }}
        aria-label="Loading avatar"
        role="status"
      />
    );
  }

  render(): ReactNode {
    return this.renderSkeleton();
  }
}

export default LoadingSkeleton;

