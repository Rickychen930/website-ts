import React, { Component, ReactNode, CSSProperties } from "react";
import { BackgroundColors, TextColors } from "../../../constants/colors";

type ImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  rounded?: boolean;
  lazy?: boolean; // Lazy loading support
  loading?: "lazy" | "eager"; // Native lazy loading
  decoding?: "async" | "auto" | "sync"; // Image decoding
  srcSet?: string; // Responsive images
  sizes?: string; // Sizes attribute for responsive images
  fetchPriority?: "high" | "low" | "auto"; // Priority hint
};

type ImageState = {
  loaded: boolean;
  error: boolean;
};

/**
 * Image Component - Optimized for Performance
 * Features:
 * - Lazy loading support
 * - Error handling with fallback
 * - Performance optimizations (decoding, loading attributes)
 * - Edge case handling
 *
 * Principles Applied:
 * - SOLID (Single Responsibility)
 * - DRY
 * - Performance First
 */
class Image extends Component<ImageProps, ImageState> {
  static defaultProps: Partial<ImageProps> = {
    alt: "Image",
    width: "100%",
    height: "auto",
    rounded: false,
    className: "",
    style: {},
    lazy: true,
    loading: "lazy",
    decoding: "async",
    fetchPriority: "auto",
  };

  private imageRef: HTMLImageElement | null = null;
  private observer: IntersectionObserver | null = null;

  constructor(props: ImageProps) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
    };
  }

  componentDidMount(): void {
    // Setup lazy loading with Intersection Observer if supported
    if (
      this.props.lazy &&
      typeof IntersectionObserver !== "undefined" &&
      this.imageRef
    ) {
      this.setupLazyLoading();
    }
  }

  componentDidUpdate(prevProps: ImageProps): void {
    // Reset state if src changes
    if (prevProps.src !== this.props.src) {
      this.setState({ loaded: false, error: false });
    }

    // Re-setup lazy loading if needed
    if (
      this.props.lazy &&
      typeof IntersectionObserver !== "undefined" &&
      this.imageRef &&
      !this.observer
    ) {
      this.setupLazyLoading();
    }
  }

  componentWillUnmount(): void {
    // Cleanup observer
    if (this.observer && this.imageRef) {
      this.observer.unobserve(this.imageRef);
      this.observer = null;
    }
  }

  /**
   * Setup Intersection Observer for lazy loading
   * Performance optimization
   */
  private setupLazyLoading(): void {
    if (!this.imageRef || typeof IntersectionObserver === "undefined") return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.imageRef) {
            // Image is in viewport, load it
            if (this.observer && this.imageRef) {
              this.observer.unobserve(this.imageRef);
              this.observer = null;
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      },
    );

    this.observer.observe(this.imageRef);
  }

  /**
   * Handle image load success
   */
  private handleLoad = (): void => {
    this.setState({ loaded: true, error: false });
  };

  /**
   * Handle image load error
   * Edge case: Fallback handling
   */
  private handleError = (): void => {
    this.setState({ error: true, loaded: false });

    if (process.env.NODE_ENV === "development") {
      const { logWarn } = require("../../../utils/logger");
      logWarn(`Failed to load image: ${this.props.src}`, undefined, "Image");
    }
  };

  public render(): ReactNode {
    const {
      src,
      alt = "Image",
      width,
      height,
      style,
      className = "",
      rounded,
      loading = "lazy",
      decoding = "async",
    } = this.props;

    // Edge case: Validate src
    if (!src || typeof src !== "string") {
      return null;
    }

    const combinedStyle: CSSProperties = {
      width,
      height,
      objectFit: "cover",
      borderRadius: rounded ? "8px" : "0px",
      display: "block",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      opacity: this.state.loaded ? 1 : 0.7,
      ...style,
    };

    // Edge case: Handle error state
    if (this.state.error) {
      return (
        <div
          className={`image-component image-error ${className}`}
          style={{
            ...combinedStyle,
            backgroundColor: BackgroundColors.QUATERNARY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: TextColors.SUBTLE,
            fontSize: "0.875rem",
          }}
          role="img"
          aria-label={alt}
        >
          {alt || "Image not available"}
        </div>
      );
    }

    return (
      <img
        ref={(ref) => {
          this.imageRef = ref;
        }}
        src={src}
        alt={alt}
        className={`image-component ${className}`}
        style={combinedStyle}
        loading={loading}
        decoding={decoding}
        srcSet={this.props.srcSet}
        sizes={this.props.sizes}
        fetchPriority={this.props.fetchPriority}
        onLoad={this.handleLoad}
        onError={this.handleError}
        aria-label={alt}
      />
    );
  }
}

export default Image;
