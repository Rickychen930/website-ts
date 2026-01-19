/**
 * useIntersectionObserver Hook
 * Reusable hook for intersection observer with performance optimizations
 * Best practice for lazy loading and scroll animations
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  enabled?: boolean;
}

export interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for Intersection Observer API
 * Optimized with proper cleanup and performance considerations
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
    enabled = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);

      if (entry.isIntersecting && triggerOnce && observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      return;
    }

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: show immediately
      setIsIntersecting(true);
      return;
    }

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root,
    });

    const currentElement = elementRef.current;
    observerRef.current.observe(currentElement);

    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
      }
      observerRef.current = null;
    };
  }, [enabled, threshold, rootMargin, root, handleIntersection]);

  return {
    ref: elementRef,
    isIntersecting,
    entry,
  };
};