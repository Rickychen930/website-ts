/**
 * Analytics utility - page views and custom events
 * Used by Analytics component (pageview) and by Contact / DownloadResume (events).
 * Configure googleAnalyticsId or plausibleDomain to enable; otherwise no-op.
 */

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  customAnalytics?: (path: string) => void;
  customEvent?: (eventName: string, params?: Record<string, string | number>) => void;
}

const analyticsConfig: AnalyticsConfig = {
  // Add your analytics IDs / callbacks here or via env
  // googleAnalyticsId: process.env.REACT_APP_GA_ID,
  // plausibleDomain: process.env.REACT_APP_PLAUSIBLE_DOMAIN,
  // customEvent: (name, params) => { /* send to your backend */ },
};

/**
 * Track a page view (path). Called by Analytics component on route change.
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;

  if (analyticsConfig.googleAnalyticsId) {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      gtag("config", analyticsConfig.googleAnalyticsId, { page_path: path });
    }
  }

  if (analyticsConfig.plausibleDomain) {
    const plausible = (window as Window & { plausible?: (n: string) => void }).plausible;
    if (plausible) plausible("pageview");
  }

  if (analyticsConfig.customAnalytics) {
    analyticsConfig.customAnalytics(path);
  }
}

/**
 * Track a custom event (e.g. contact_submit, download_resume).
 * No-op when no analytics is configured.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>,
): void {
  if (typeof window === "undefined") return;

  if (analyticsConfig.googleAnalyticsId) {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      gtag("event", eventName, params ?? {});
    }
  }

  if (analyticsConfig.plausibleDomain) {
    const plausible = (window as Window & { plausible?: (n: string, o?: { props?: Record<string, string | number> }) => void }).plausible;
    if (plausible) plausible(eventName, params ? { props: params } : undefined);
  }

  if (analyticsConfig.customEvent) {
    analyticsConfig.customEvent(eventName, params);
  }
}
