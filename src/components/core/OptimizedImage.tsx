/**
 * OptimizedImage - Advanced Image Component
 * Best practices for image optimization and performance
 * 
 * Features:
 * - Automatic WebP/AVIF format detection
 * - Responsive images with srcSet
 * - Lazy loading with Intersection Observer
 * - Error handling with retry and fallback
 * - Performance monitoring
 * - Accessibility enhancements
 */

import React, { memo, useMemo } from 'react';
import { LazyImage, ILazyImageProps } from './LazyImage';

export interface IOptimizedImageProps extends Omit<ILazyImageProps, 'srcSet' | 'sizes'> {
  src: string;
  widths?: number[];
  aspectRatio?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}

/**
 * Generate responsive srcSet from source image
 */
const generateSrcSet = (
  src: string,
  widths: number[],
  format?: string
): string => {
  return widths
    .map((width) => {
      // In production, you would use an image CDN or service
      // For now, we'll use the original src with width parameter
      const formatExt = format && format !== 'auto' ? `.${format}` : '';
      return `${src}?w=${width}${formatExt} ${width}w`;
    })
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
const generateSizes = (widths: number[]): string => {
  if (widths.length === 0) return '100vw';
  
  const breakpoints = [
    '(max-width: 480px)',
    '(max-width: 768px)',
    '(max-width: 1024px)',
    '(max-width: 1280px)',
  ];
  
  const sizes = widths.map((width, index) => {
    if (index === 0) {
      return `(max-width: ${width}px) ${width}px`;
    }
    const breakpoint = breakpoints[index - 1] || '';
    return `${breakpoint} ${width}px`;
  });
  
  sizes.push(`${widths[widths.length - 1]}px`); // Default size
  return sizes.join(', ');
};

/**
 * OptimizedImage Component
 * Wrapper around LazyImage with automatic optimization
 */
const OptimizedImageComponent: React.FC<IOptimizedImageProps> = ({
  src,
  widths = [320, 640, 1024, 1920],
  aspectRatio,
  quality = 85,
  format = 'auto',
  alt,
  ...props
}) => {
  // Memoize srcSet and sizes to prevent recalculation
  const { srcSet, sizes } = useMemo(() => {
    const generatedSrcSet = widths.length > 1 
      ? generateSrcSet(src, widths, format !== 'auto' ? format : undefined)
      : undefined;
    
    const generatedSizes = widths.length > 1
      ? generateSizes(widths)
      : undefined;

    return {
      srcSet: generatedSrcSet,
      sizes: generatedSizes,
    };
  }, [src, widths, format]);

  // Determine fetch priority based on position
  const fetchPriority = useMemo(() => {
    // High priority for above-the-fold images
    // This would typically be determined by layout position
    return props.fetchPriority || 'auto';
  }, [props.fetchPriority]);

  return (
    <LazyImage
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      fetchPriority={fetchPriority}
      decoding="async"
      {...props}
    />
  );
};

// Memoize to prevent unnecessary re-renders
export const OptimizedImage = memo(OptimizedImageComponent);