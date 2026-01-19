/**
 * LazyImage - Lazy Loading Image Component
 * Performance-optimized image loading with intersection observer
 * 
 * Features:
 * - Lazy loading with Intersection Observer
 * - Placeholder while loading
 * - Error handling
 * - Smooth fade-in animation
 */

import React, { Component, ImgHTMLAttributes } from 'react';
import './LazyImage.css';

export interface ILazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
  srcSet?: string;
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
  retryCount?: number;
  fallbackSrc?: string;
}

interface ILazyImageState {
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;
  retryAttempts: number;
  currentSrc: string;
}

/**
 * LazyImage Component
 * Lazy loads images when they enter viewport
 */
export class LazyImage extends Component<ILazyImageProps, ILazyImageState> {
  private imgRef: React.RefObject<HTMLImageElement | null> = React.createRef();
  private observer: IntersectionObserver | null = null;

  constructor(props: ILazyImageProps) {
    super(props);
    this.state = {
      isLoaded: false,
      isInView: false,
      hasError: false,
      retryAttempts: 0,
      currentSrc: props.src,
    };
  }

  componentDidMount(): void {
    if (!this.imgRef.current) return;

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: load immediately
      this.setState({ isInView: true });
      return;
    }

    const { threshold = 0.1, rootMargin = '50px' } = this.props;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setState({ isInView: true });
            if (this.observer && this.imgRef.current) {
              this.observer.unobserve(this.imgRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    this.observer.observe(this.imgRef.current);
  }

  componentWillUnmount(): void {
    if (this.observer && this.imgRef.current) {
      this.observer.unobserve(this.imgRef.current);
    }
  }

  private handleLoad = (): void => {
    this.setState({ isLoaded: true });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  private handleError = (): void => {
    const { retryCount = 0, fallbackSrc } = this.props;
    const { retryAttempts, currentSrc } = this.state;

    // Retry with fallback if available
    if (retryAttempts < retryCount && fallbackSrc && currentSrc === this.props.src) {
      this.setState({
        retryAttempts: retryAttempts + 1,
        currentSrc: fallbackSrc,
      });
      return;
    }

    // Final error state
    this.setState({ hasError: true });
    if (this.props.onError) {
      this.props.onError();
    }
  };

  render(): React.ReactNode {
    const { 
      src, 
      alt, 
      placeholder,
      className = '',
      ...restProps 
    } = this.props;
    const { isLoaded, isInView, hasError } = this.state;

    if (hasError) {
      return (
        <div className={`lazy-image lazy-image--error ${className}`}>
          <span className="lazy-image__error-icon">⚠️</span>
          <span className="lazy-image__error-text">Failed to load image</span>
        </div>
      );
    }

    return (
      <div className={`lazy-image ${className}`}>
        {/* Placeholder */}
        {!isLoaded && placeholder && (
          <div 
            className="lazy-image__placeholder"
            style={{ backgroundImage: `url(${placeholder})` }}
            aria-hidden="true"
          />
        )}

        {/* Actual Image */}
        {isInView && (
          <img
            ref={this.imgRef}
            src={this.state.currentSrc}
            alt={alt}
            srcSet={this.props.srcSet}
            sizes={this.props.sizes}
            fetchPriority={this.props.fetchPriority || 'auto'}
            decoding={this.props.decoding || 'async'}
            className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
            onLoad={this.handleLoad}
            onError={this.handleError}
            loading="lazy"
            aria-label={alt}
            {...restProps}
          />
        )}

        {/* Loading indicator */}
        {!isLoaded && !placeholder && (
          <div className="lazy-image__spinner" aria-hidden="true">
            <div className="lazy-image__spinner-circle"></div>
          </div>
        )}
      </div>
    );
  }
}

export default LazyImage;
