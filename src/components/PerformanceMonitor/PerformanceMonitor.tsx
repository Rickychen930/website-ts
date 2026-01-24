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

    // Track navigation timing using modern PerformanceNavigationTiming API
    const trackNavigationTiming = () => {
      try {
        // Use modern PerformanceNavigationTiming API (more reliable)
        const navigationEntries = performance.getEntriesByType(
          "navigation",
        ) as PerformanceNavigationTiming[];

        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0];
          const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
          const domReady =
            navEntry.domContentLoadedEventEnd - navEntry.fetchStart;

          // Only log valid positive values
          if (loadTime > 0 && loadTime < Number.MAX_SAFE_INTEGER) {
            console.log("Page Load Time:", Math.round(loadTime));
          }
          if (domReady > 0 && domReady < Number.MAX_SAFE_INTEGER) {
            console.log("DOM Ready:", Math.round(domReady));
          }
        } else {
          // Fallback to legacy API if modern API not available
          const timing = (window.performance as any).timing;
          if (timing && timing.navigationStart && timing.loadEventEnd) {
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady =
              timing.domContentLoadedEventEnd - timing.navigationStart;

            // Only log valid positive values
            if (loadTime > 0 && loadTime < Number.MAX_SAFE_INTEGER) {
              console.log("Page Load Time:", Math.round(loadTime));
            }
            if (domReady > 0 && domReady < Number.MAX_SAFE_INTEGER) {
              console.log("DOM Ready:", Math.round(domReady));
            }
          }
        }
        // Send to analytics
      } catch (error) {
        console.warn("Navigation timing not available:", error);
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
