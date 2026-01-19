/**
 * PerformanceMonitor - Performance Monitoring Component
 * Tracks and reports performance metrics
 * Best practice for performance optimization
 */

import React, { useEffect, useRef, memo } from 'react';

export interface IPerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
  logMetrics?: boolean;
  onMetricsReady?: (metrics: PerformanceMetrics) => void;
}

export interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
  averageRenderTime: number;
}

/**
 * PerformanceMonitor Component
 * Monitors component performance and provides metrics
 */
const PerformanceMonitorComponent: React.FC<IPerformanceMonitorProps> = ({
  componentName,
  enabled = process.env.NODE_ENV === 'development',
  logMetrics = false,
  onMetricsReady,
}) => {
  const mountStartRef = useRef<number>(0);
  const renderStartRef = useRef<number>(0);
  const updateCountRef = useRef<number>(0);
  const renderTimesRef = useRef<number[]>([]);

  useEffect(() => {
    if (!enabled) return;

    mountStartRef.current = performance.now();
    
    // Capture ref values for cleanup
    const updateCountRefValue = updateCountRef;
    const renderTimesRefValue = renderTimesRef;
    
    return () => {
      const mountTime = performance.now() - mountStartRef.current;
      const metrics: PerformanceMetrics = {
        renderTime: renderTimesRefValue.current[renderTimesRefValue.current.length - 1] || 0,
        mountTime,
        updateCount: updateCountRefValue.current,
        averageRenderTime:
          renderTimesRefValue.current.reduce((a, b) => a + b, 0) / renderTimesRefValue.current.length || 0,
      };

      if (logMetrics) {
        console.log(`[Performance] ${componentName}:`, metrics);
      }

      if (onMetricsReady) {
        onMetricsReady(metrics);
      }
    };
  }, [enabled, componentName, logMetrics, onMetricsReady]);

  useEffect(() => {
    if (!enabled) return;

    renderStartRef.current = performance.now();
    updateCountRef.current++;

    // Capture ref value for cleanup
    const renderTimesRefValue = renderTimesRef;

    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      renderTimesRefValue.current.push(renderTime);

      // Keep only last 10 render times
      if (renderTimesRefValue.current.length > 10) {
        renderTimesRefValue.current.shift();
      }

      // Warn on slow renders
      if (renderTime > 16) {
        console.warn(
          `[Performance] ${componentName} slow render: ${renderTime.toFixed(2)}ms`
        );
      }
    };
  });

  return null; // This component doesn't render anything
};

export const PerformanceMonitor = memo(PerformanceMonitorComponent);