/**
 * View Helpers Utility
 * Common utilities for view components to reduce code duplication
 * 
 * Principles Applied:
 * - DRY: Centralized common patterns
 * - Single Responsibility: Each function has one clear purpose
 * - Performance: Optimized helper functions
 */

/**
 * Normalize array data - handles both old and new formats
 * Generic utility for data normalization across sections
 */
export function normalizeArrayData<T extends { key: string }>(
  data: T[] | Array<Record<string, unknown>> | null | undefined,
  mapper: (item: Record<string, unknown>) => T
): T[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    // If already in correct format, return as is
    if (item && typeof item === 'object' && 'key' in item) {
      return item as T;
    }
    // Otherwise, map to correct format
    return mapper(item as Record<string, unknown>);
  });
}

/**
 * Check if data should be displayed
 * Centralized validation logic
 */
export function shouldDisplayData<T>(
  data: T | null | undefined,
  validator?: (data: T) => boolean
): boolean {
  if (!data) {
    return false;
  }

  if (Array.isArray(data)) {
    return data.length > 0;
  }

  if (validator) {
    return validator(data);
  }

  return true;
}

/**
 * Memoize expensive computations
 * Performance optimization helper
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator
      ? keyGenerator(...args)
      : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Debounce function calls
 * Performance optimization for frequent events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>): void {
    const later = (): void => {
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
 * Throttle function calls
 * Performance optimization for frequent events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>): void {
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
 * Safe array slice with limit
 * Prevents unnecessary array operations
 */
export function safeSlice<T>(
  array: T[],
  limit: number
): T[] {
  if (!array || array.length === 0) {
    return [];
  }

  if (array.length <= limit) {
    return array;
  }

  return array.slice(0, limit);
}

/**
 * Generate stable keys for React lists
 * Better than using index for performance
 */
export function generateStableKey(
  prefix: string,
  identifier: string | number,
  index?: number
): string {
  return `${prefix}-${identifier}${index !== undefined ? `-${index}` : ''}`;
}

/**
 * Check if component is mounted
 * Safety check for async operations
 */
export function createMountGuard() {
  let isMounted = false;

  return {
    setMounted: (value: boolean): void => {
      isMounted = value;
    },
    isMounted: (): boolean => isMounted,
    safeSetState: <S>(
      setState: React.Dispatch<React.SetStateAction<S>>,
      newState: S
    ): void => {
      if (isMounted) {
        setState(newState);
      }
    },
  };
}

