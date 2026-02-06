/**
 * Analytics Component - Ready for analytics integration
 * Uses shared trackPageView from utils/analytics (GA, Plausible, custom).
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/analytics";

export const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};
