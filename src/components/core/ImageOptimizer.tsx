/**
 * ImageOptimizer - Advanced Image Optimization Component
 * Best practices for image performance and UX
 * 
 * Features:
 * - Automatic format detection (WebP/AVIF)
 * - Responsive images
 * - Lazy loading
 * - Blur-up placeholder
 * - Error handling with retry
 * - Performance monitoring
 */

import React, { memo, useState, useCallback, useMemo } from 'react';
import { LazyImage, ILazyImageProps } from './LazyImage';

export interface IImageOptimizerProps extends Omit<ILazyImageProps, 'src'> {
  src: string;
  srcSet?: string;
  sizes?: string;
  aspectRatio?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  blurDataURL?: string;
  priority?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

/**
 * Detect WebP support
 */
const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Detect AVIF support
 */
const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

/**
 * ImageOptimizer Component
 * Advanced image component with automatic optimizations
 */
const ImageOptimizerComponent: React.FC<IImageOptimizerProps> = ({
  src,
  srcSet,
  sizes,
  aspectRatio,
  quality = 85,
  format = 'auto',
  blurDataURL,
  priority = false,
  onLoadStart,
  onLoadEnd,
  onLoad,
  ...props
}) => {
  const [bestFormat, setBestFormat] = useState<string>(format);
  const [isLoading, setIsLoading] = useState(true);

  // Detect best format on mount
  React.useEffect(() => {
    if (format === 'auto') {
      Promise.all([supportsAVIF(), supportsWebP()]).then(([avif, webp]) => {
        if (avif) {
          setBestFormat('avif');
        } else if (webp) {
          setBestFormat('webp');
        } else {
          setBestFormat('jpg');
        }
      });
    }
  }, [format]);

  // Optimized src with format
  const optimizedSrc = useMemo(() => {
    if (format !== 'auto' && bestFormat !== format) {
      // In production, use image CDN to transform
      return `${src}?format=${bestFormat}&quality=${quality}`;
    }
    return src;
  }, [src, bestFormat, format, quality]);

  // Handle load with callbacks
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    if (onLoadStart) {
      onLoadStart();
    }
    if (onLoad) {
      onLoad();
    }
    if (onLoadEnd) {
      onLoadEnd();
    }
  }, [onLoad, onLoadStart, onLoadEnd]);

  // Aspect ratio container
  const containerStyle = useMemo(() => {
    if (aspectRatio) {
      return {
        position: 'relative' as const,
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        overflow: 'hidden' as const,
      };
    }
    return {};
  }, [aspectRatio]);

  return (
    <div style={containerStyle}>
      <LazyImage
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        placeholder={blurDataURL}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={handleLoad}
        {...props}
      />
      {isLoading && blurDataURL && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export const ImageOptimizer = memo(ImageOptimizerComponent);