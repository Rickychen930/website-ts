/**
 * Performance Monitor - Tracks and logs performance metrics
 * Ready for integration with monitoring services
 */

import { useEffect } from "react";

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) {
      return;
    }

    // Track page load performance
    const trackPerformance = () => {
      if ("PerformanceObserver" in window) {
        try {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
              // Send to analytics: lastEntry.renderTime || lastEntry.loadTime
            }
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log("FID:", entry.processingStart - entry.startTime);
              // Send to analytics: entry.processingStart - entry.startTime
            });
          });
          fidObserver.observe({ entryTypes: ["first-input"] });

          // Cumulative Layout Shift
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries() as any[];
            entries.forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            console.log("CLS:", clsValue);
            // Send to analytics: clsValue
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });

          // Cleanup
          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
          };
        } catch (error) {
          console.warn("Performance monitoring not supported:", error);
        }
      }
    };

    // Track navigation timing
    const trackNavigationTiming = () => {
      if ("performance" in window && "timing" in window.performance) {
        const timing = (window.performance as any).timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady =
          timing.domContentLoadedEventEnd - timing.navigationStart;

        console.log("Page Load Time:", loadTime);
        console.log("DOM Ready:", domReady);
        // Send to analytics
      }
    };

    // Run after page load
    if (document.readyState === "complete") {
      trackPerformance();
      trackNavigationTiming();
    } else {
      window.addEventListener("load", () => {
        trackPerformance();
        trackNavigationTiming();
      });
    }
  }, []);

  return null;
};
