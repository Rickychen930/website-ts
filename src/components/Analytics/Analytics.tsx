/**
 * Analytics Component - Ready for analytics integration
 * Supports Google Analytics, Plausible, or custom analytics
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  customAnalytics?: (path: string) => void;
}

const analyticsConfig: AnalyticsConfig = {
  // Add your analytics IDs here
  // googleAnalyticsId: 'G-XXXXXXXXXX',
  // plausibleDomain: 'yourdomain.com',
  // customAnalytics: (path) => { /* custom tracking */ },
};

export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    if (analyticsConfig.googleAnalyticsId && typeof window !== "undefined") {
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag("config", analyticsConfig.googleAnalyticsId, {
          page_path: location.pathname + location.search,
        });
      }
    }

    // Plausible Analytics
    if (analyticsConfig.plausibleDomain && typeof window !== "undefined") {
      const plausible = (window as any).plausible;
      if (plausible) {
        plausible("pageview");
      }
    }

    // Custom Analytics
    if (analyticsConfig.customAnalytics) {
      analyticsConfig.customAnalytics(location.pathname + location.search);
    }
  }, [location]);

  return null;
};
