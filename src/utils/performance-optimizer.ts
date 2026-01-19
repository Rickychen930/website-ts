/**
 * Performance Optimizer Utilities
 * Advanced performance optimization helpers
 * Best practices for web performance
 */

/**
 * Preload critical resources
 */
export const preloadResource = (
  href: string,
  as: 'script' | 'style' | 'image' | 'font' | 'fetch',
  crossorigin?: boolean
): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
};

/**
 * Prefetch resources for faster navigation
 */
export const prefetchResource = (href: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Defer non-critical CSS
 */
export const deferCSS = (href: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Lazy load script
 */
export const loadScript = (
  src: string,
  options: { async?: boolean; defer?: boolean; onLoad?: () => void } = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document not available'));
      return;
    }

    // Check if script already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;
    
    script.onload = () => {
      if (options.onLoad) {
        options.onLoad();
      }
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
};

/**
 * Measure Web Vitals
 */
export const measureWebVitals = (onPerfEntry?: (metric: any) => void): void => {
  if (typeof window === 'undefined' || !onPerfEntry) return;

  // Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    onPerfEntry({
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      onPerfEntry({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
      });
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    const entries = list.getEntries() as any[];
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        onPerfEntry({
          name: 'CLS',
          value: clsValue,
        });
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });
};

/**
 * Optimize images with responsive srcSet
 */
export const generateImageSrcSet = (
  baseUrl: string,
  widths: number[],
  format?: string
): { srcSet: string; sizes: string } => {
  const srcSet = widths
    .map((width) => {
      const formatExt = format ? `.${format}` : '';
      return `${baseUrl}?w=${width}${formatExt} ${width}w`;
    })
    .join(', ');

  const sizes = widths
    .map((width, index) => {
      if (index === 0) {
        return `(max-width: ${width}px) ${width}px`;
      }
      return `(max-width: ${width}px) ${width}px`;
    })
    .join(', ');

  return { srcSet, sizes: sizes || '100vw' };
};

/**
 * Batch DOM updates for better performance
 */
export const batchDOMUpdates = (updates: (() => void)[]): void => {
  if (typeof window === 'undefined') return;

  // Use requestAnimationFrame for batching
  requestAnimationFrame(() => {
    updates.forEach((update) => update());
  });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if connection is slow
 */
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  if (!connection) return false;

  // Check effective connection type
  const effectiveType = connection.effectiveType;
  return effectiveType === 'slow-2g' || effectiveType === '2g';
};

/**
 * Optimize for slow connections
 */
export const optimizeForSlowConnection = (): void => {
  if (!isSlowConnection()) return;

  // Disable animations
  document.documentElement.style.setProperty('--animation-duration-base', '0s');
  document.documentElement.style.setProperty('--transition-base', '0s');

  // Reduce image quality
  // This would typically be handled by your image CDN
};