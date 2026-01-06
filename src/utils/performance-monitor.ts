/**
 * Performance Monitoring Utilities
 * Tracks and reports performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  /**
   * Initialize performance monitoring
   */
  initialize(): void {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // Monitor Long Tasks
    this.observeLongTasks();

    // Monitor Resource Timing
    this.observeResourceTiming();

    // Monitor Navigation Timing
    this.measureNavigationTiming();

    // Monitor Web Vitals
    this.measureWebVitals();
  }

  /**
   * Observe long tasks (blocking main thread)
   */
  private observeLongTasks(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Tasks longer than 50ms
            this.recordMetric({
              name: "long-task",
              value: entry.duration,
              unit: "ms",
              timestamp: Date.now(),
            });

            if (process.env.NODE_ENV === "development") {
              console.warn("Long task detected:", entry.duration, "ms");
            }
          }
        }
      });

      observer.observe({ entryTypes: ["longtask"] });
      this.observers.push(observer);
    } catch (error) {
      // Long task observer not supported
    }
  }

  /**
   * Observe resource timing
   */
  private observeResourceTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
          if (entry.duration > 1000) {
            // Resources taking > 1s
            this.recordMetric({
              name: "slow-resource",
              value: entry.duration,
              unit: "ms",
              timestamp: Date.now(),
            });
          }
        }
      });

      observer.observe({ entryTypes: ["resource"] });
      this.observers.push(observer);
    } catch (error) {
      // Resource observer not supported
    }
  }

  /**
   * Measure navigation timing
   */
  private measureNavigationTiming(): void {
    if (typeof window === "undefined" || !window.performance) return;

    window.addEventListener("load", () => {
      const timing = window.performance.timing;

      const metrics = {
        "dns-lookup": timing.domainLookupEnd - timing.domainLookupStart,
        "tcp-connection": timing.connectEnd - timing.connectStart,
        "server-response": timing.responseStart - timing.requestStart,
        "dom-processing": timing.domComplete - timing.domLoading,
        "page-load": timing.loadEventEnd - timing.navigationStart,
      };

      Object.entries(metrics).forEach(([name, value]) => {
        this.recordMetric({
          name,
          value,
          unit: "ms",
          timestamp: Date.now(),
        });
      });
    });
  }

  /**
   * Measure Web Vitals (LCP, FID, CLS)
   */
  private measureWebVitals(): void {
    // Largest Contentful Paint (LCP)
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        this.recordMetric({
          name: "lcp",
          value: lastEntry.renderTime || lastEntry.loadTime,
          unit: "ms",
          timestamp: Date.now(),
        });
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(observer);
    } catch (error) {
      // LCP observer not supported
    }

    // First Input Delay (FID)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          this.recordMetric({
            name: "fid",
            value: entry.processingStart - entry.startTime,
            unit: "ms",
            timestamp: Date.now(),
          });
        }
      });

      observer.observe({ entryTypes: ["first-input"] });
      this.observers.push(observer);
    } catch (error) {
      // FID observer not supported
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric({
              name: "cls",
              value: clsValue,
              unit: "score",
              timestamp: Date.now(),
            });
          }
        }
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(observer);
    } catch (error) {
      // CLS observer not supported
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  /**
   * Get average metric value
   */
  getAverageMetric(name: string): number | null {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return null;

    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }

  /**
   * Export metrics (for sending to analytics)
   */
  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }
}

/**
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Initialize performance monitoring on page load
 */
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      performanceMonitor.initialize();
    });
  } else {
    performanceMonitor.initialize();
  }
}
