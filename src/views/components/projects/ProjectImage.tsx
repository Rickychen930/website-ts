/**
 * Project Image Component
 * Reusable image component with lazy loading and error handling
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Project Image Props
 */
interface ProjectImageProps {
  src?: string;
  alt: string;
  icon?: string;
  className?: string;
  fallbackIcon?: string;
  onError?: () => void;
}

/**
 * Project Image State
 */
interface ProjectImageState {
  imageError: boolean;
  imageLoaded: boolean;
}

/**
 * Project Image Component
 * PureComponent for performance optimization
 */
export class ProjectImage extends PureComponent<ProjectImageProps, ProjectImageState> {
  static defaultProps: Partial<ProjectImageProps> = {
    src: undefined,
    icon: undefined,
    className: "",
    fallbackIcon: "📦",
    onError: undefined,
  };

  constructor(props: ProjectImageProps) {
    super(props);
    this.state = {
      imageError: false,
      imageLoaded: false,
    };
  }

  /**
   * Handle image load error
   */
  private handleImageError = (): void => {
    this.setState({ imageError: true });
    if (this.props.onError) {
      this.props.onError();
    }
  };

  /**
   * Handle image load success
   */
  private handleImageLoad = (): void => {
    this.setState({ imageLoaded: true });
  };

  /**
   * Get class names
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const { imageError, imageLoaded } = this.state;
    const classes = [
      "project-image",
      className,
      imageError && "project-image-error",
      imageLoaded && "project-image-loaded",
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon fallback
   */
  private renderIconFallback(): ReactNode {
    const { icon, fallbackIcon = "📦", alt } = this.props;
    const displayIcon = icon || fallbackIcon;

    return (
      <div className="project-image-icon-fallback" aria-label={alt}>
        <span className="project-image-icon" aria-hidden="true">
          {displayIcon}
        </span>
      </div>
    );
  }

  /**
   * Render image
   */
  private renderImage(): ReactNode {
    const { src, alt } = this.props;
    const { imageError } = this.state;

    if (!src || imageError) {
      return this.renderIconFallback();
    }

    return (
      <>
        {!this.state.imageLoaded && (
          <div className="project-image-placeholder" aria-hidden="true">
            <div className="project-image-skeleton"></div>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className="project-image-element"
          onError={this.handleImageError}
          onLoad={this.handleImageLoad}
          loading="lazy"
          decoding="async"
        />
      </>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    return (
      <div className={this.getClassNames()}>
        {this.renderImage()}
      </div>
    );
  }
}

