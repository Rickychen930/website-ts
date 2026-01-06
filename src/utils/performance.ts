/**
 * Performance Utilities
 * Professional performance optimization helpers
 */

/**
 * Debounce function - limits function execution frequency
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - limits function execution rate
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Lazy load images
 */
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  if ("loading" in HTMLImageElement.prototype) {
    img.loading = "lazy";
    img.src = src;
  } else {
    // Fallback for older browsers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            target.src = src;
            observer.unobserve(target);
          }
        });
      },
      { rootMargin: "50px" }
    );
    observer.observe(img);
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, type?: string): void {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (type) {
    link.type = type;
  }
  document.head.appendChild(link);
}

/**
 * Prefetch resource for future navigation
 */
export function prefetchResource(href: string, as: string): void {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Measure performance metric
 */
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof performance !== "undefined" && performance.mark) {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    const measureName = `${name}-measure`;

    performance.mark(startMark);
    fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);

    const measure = performance.getEntriesByName(measureName)[0];
    if (process.env.NODE_ENV === "development") {
      console.log(`Performance [${name}]:`, measure.duration, "ms");
    }
  } else {
    fn();
  }
}

/**
 * Request idle callback with fallback
 */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback to setTimeout
    return setTimeout(callback, options?.timeout || 1) as unknown as number;
  }
}

/**
 * Cancel idle callback
 */
export function cancelIdleCallback(handle: number): void {
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(handle);
  } else {
    clearTimeout(handle);
  }
}

