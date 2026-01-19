/**
 * usePerformanceMonitor Hook
 * Monitors component performance and provides metrics
 * Best practice for performance optimization
 */

import { useEffect, useRef, useCallback } from 'react';

export interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
}

export interface UsePerformanceMonitorOptions {
  componentName: string;
  enabled?: boolean;
  logThreshold?: number; // Log if render time exceeds this (ms)
}

/**
 * Hook to monitor component performance
 * Tracks render times and provides metrics
 */
export const usePerformanceMonitor = (
  options: UsePerformanceMonitorOptions
): PerformanceMetrics => {
  const { componentName, enabled = process.env.NODE_ENV === 'development', logThreshold = 16 } = options;
  
  const metricsRef = useRef<PerformanceMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    totalRenderTime: 0,
  });

  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    renderStartRef.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      const metrics = metricsRef.current;
      
      metrics.renderCount++;
      metrics.lastRenderTime = renderTime;
      metrics.totalRenderTime += renderTime;
      metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;

      // Log slow renders
      if (renderTime > logThreshold) {
        console.warn(
          `[Performance] ${componentName} slow render: ${renderTime.toFixed(2)}ms (avg: ${metrics.averageRenderTime.toFixed(2)}ms)`
        );
      }
    };
  });

  return metricsRef.current;
};

/**
 * Hook to measure async operation performance
 */
export const useAsyncPerformance = () => {
  const measureAsync = useCallback(async <T,>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await operation();
      const duration = performance.now() - start;
      
      if (duration > 1000) {
        console.warn(`[Performance] Slow async operation "${operationName}": ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[Performance] Failed async operation "${operationName}" after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }, []);

  return { measureAsync };
};