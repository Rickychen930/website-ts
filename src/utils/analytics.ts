/**
 * Analytics Utility
 * Tracks user behavior and events
 * Supports Google Analytics, Plausible, and custom analytics
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, any> },
    ) => void;
    dataLayer?: any[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

/**
 * Analytics Service Class
 */
export class AnalyticsService {
  private enabled: boolean;
  private analyticsType: "google" | "plausible" | "custom" | "none";

  constructor() {
    this.enabled = process.env.REACT_APP_ANALYTICS_ENABLED === "true";
    this.analyticsType =
      (process.env.REACT_APP_ANALYTICS_TYPE as any) || "none";
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string): void {
    if (
      !this.enabled ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    )
      return;

    switch (this.analyticsType) {
      case "google":
        const gaId = process.env.REACT_APP_GA_MEASUREMENT_ID;
        if (window.gtag && gaId) {
          window.gtag("config", gaId, {
            page_path: path,
            page_title: title || document.title,
          });
        }
        break;

      case "plausible":
        if (window.plausible && typeof document !== "undefined") {
          window.plausible("pageview", {
            props: {
              path,
              title: title || document.title,
            },
          });
        }
        break;

      case "custom":
        if (typeof document !== "undefined") {
          this.sendToCustomAnalytics({
            type: "pageview",
            path,
            title: title || document.title,
            timestamp: new Date().toISOString(),
          });
        }
        break;
    }
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.enabled || typeof window === "undefined") return;

    const { action, category, label, value, customData } = event;

    switch (this.analyticsType) {
      case "google":
        if (window.gtag) {
          window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
            ...customData,
          });
        }
        break;

      case "plausible":
        if (window.plausible) {
          window.plausible(action, {
            props: {
              category,
              label,
              value,
              ...customData,
            },
          });
        }
        break;

      case "custom":
        this.sendToCustomAnalytics({
          type: "event",
          action,
          category,
          label,
          value,
          ...customData,
          timestamp: new Date().toISOString(),
        });
        break;
    }
  }

  /**
   * Track CTA button click
   */
  trackCTAClick(
    ctaType: "hire-me" | "resume" | "contact",
    location: string,
  ): void {
    this.trackEvent({
      action: "cta_click",
      category: "engagement",
      label: `${ctaType}_${location}`,
      customData: {
        cta_type: ctaType,
        location,
      },
    });
  }

  /**
   * Track section view
   */
  trackSectionView(sectionId: string, sectionName: string): void {
    this.trackEvent({
      action: "section_view",
      category: "navigation",
      label: sectionName,
      customData: {
        section_id: sectionId,
        section_name: sectionName,
      },
    });
  }

  /**
   * Track resume download
   */
  trackResumeDownload(): void {
    this.trackEvent({
      action: "resume_download",
      category: "engagement",
      label: "resume_download",
    });
  }

  /**
   * Track contact form submission
   */
  trackContactFormSubmission(success: boolean): void {
    this.trackEvent({
      action: "contact_form_submit",
      category: "engagement",
      label: success ? "success" : "failed",
      customData: {
        success,
      },
    });
  }

  /**
   * Track error
   */
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      action: "error",
      category: "error",
      label: error.message,
      customData: {
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack,
        context,
      },
    });
  }

  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomAnalytics(
    data: Record<string, any>,
  ): Promise<void> {
    const analyticsUrl = process.env.REACT_APP_ANALYTICS_URL;
    if (
      !analyticsUrl ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    )
      return;

    try {
      await fetch(analyticsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "",
          url: window.location.href,
          referrer: document.referrer || "",
        }),
        keepalive: true,
      });
    } catch (error) {
      // Fail silently - analytics should not break the app
      if (process.env.NODE_ENV === "development") {
        console.warn("Analytics tracking failed:", error);
      }
    }
  }

  /**
   * Enable/disable analytics
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Check if analytics is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

/**
 * Global analytics instance
 */
export const analytics = new AnalyticsService();

/**
 * Convenience functions
 */
export const trackPageView = (path: string, title?: string) =>
  analytics.trackPageView(path, title);

export const trackEvent = (event: AnalyticsEvent) =>
  analytics.trackEvent(event);

export const trackCTAClick = (
  ctaType: "hire-me" | "resume" | "contact",
  location: string,
) => analytics.trackCTAClick(ctaType, location);

export const trackSectionView = (sectionId: string, sectionName: string) =>
  analytics.trackSectionView(sectionId, sectionName);

export const trackResumeDownload = () => analytics.trackResumeDownload();

export const trackContactFormSubmission = (success: boolean) =>
  analytics.trackContactFormSubmission(success);

export const trackError = (error: Error, context?: string) =>
  analytics.trackError(error, context);
