/**
 * Analytics Utility Tests
 * White Box Testing for Analytics Service
 */

// AnalyticsService imported for type checking but not used directly in tests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnalyticsService } from "../analytics";

// Mock window object
const mockWindow = {
  gtag: jest.fn(),
  plausible: jest.fn(),
  dataLayer: [],
  location: { href: "http://localhost:3000" },
};

describe("AnalyticsService", () => {
  let service: AnalyticsService;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    service = new AnalyticsService();
    (global as any).window = mockWindow;
    (global as any).document = { title: "Test Page" };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
    delete (global as any).window;
    delete (global as any).document;
  });

  describe("trackPageView", () => {
    it("should not track if analytics is disabled", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "false";
      service = new AnalyticsService();

      service.trackPageView("/test", "Test");

      expect(mockWindow.gtag).not.toHaveBeenCalled();
      expect(mockWindow.plausible).not.toHaveBeenCalled();
    });

    it("should track with Google Analytics if enabled", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      process.env.REACT_APP_GA_MEASUREMENT_ID = "G-TEST123";
      service = new AnalyticsService();

      service.trackPageView("/test", "Test Page");

      expect(mockWindow.gtag).toHaveBeenCalledWith("config", "G-TEST123", {
        page_path: "/test",
        page_title: "Test Page",
      });
    });

    it("should not track with Google Analytics if GA ID is missing", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      delete process.env.REACT_APP_GA_MEASUREMENT_ID;
      service = new AnalyticsService();

      service.trackPageView("/test", "Test Page");

      expect(mockWindow.gtag).not.toHaveBeenCalled();
    });

    it("should track with Plausible if enabled", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "plausible";
      service = new AnalyticsService();

      service.trackPageView("/test", "Test Page");

      expect(mockWindow.plausible).toHaveBeenCalledWith("pageview", {
        props: {
          path: "/test",
          title: "Test Page",
        },
      });
    });

    it("should handle missing window gracefully", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      process.env.REACT_APP_GA_MEASUREMENT_ID = "G-TEST123";
      service = new AnalyticsService();
      delete (global as any).window;

      expect(() => service.trackPageView("/test", "Test")).not.toThrow();
    });

    it("should handle missing document gracefully", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      process.env.REACT_APP_GA_MEASUREMENT_ID = "G-TEST123";
      service = new AnalyticsService();
      delete (global as any).document;

      expect(() => service.trackPageView("/test", "Test")).not.toThrow();
    });
  });

  describe("trackEvent", () => {
    it("should track event with Google Analytics", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      service = new AnalyticsService();

      service.trackEvent({
        action: "test_action",
        category: "test_category",
        label: "test_label",
        value: 1,
      });

      expect(mockWindow.gtag).toHaveBeenCalledWith("event", "test_action", {
        event_category: "test_category",
        event_label: "test_label",
        value: 1,
      });
    });

    it("should track event with Plausible", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "plausible";
      service = new AnalyticsService();

      service.trackEvent({
        action: "test_action",
        category: "test_category",
        label: "test_label",
        value: 1,
      });

      expect(mockWindow.plausible).toHaveBeenCalledWith("test_action", {
        props: {
          category: "test_category",
          label: "test_label",
          value: 1,
        },
      });
    });
  });

  describe("trackCTAClick", () => {
    it("should track CTA click", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      service = new AnalyticsService();
      const trackEventSpy = jest.spyOn(service, "trackEvent");

      service.trackCTAClick("hire-me", "header");

      expect(trackEventSpy).toHaveBeenCalledWith({
        action: "cta_click",
        category: "engagement",
        label: "hire-me_header",
        customData: {
          cta_type: "hire-me",
          location: "header",
        },
      });
    });
  });

  describe("trackSectionView", () => {
    it("should track section view", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      process.env.REACT_APP_ANALYTICS_TYPE = "google";
      service = new AnalyticsService();
      const trackEventSpy = jest.spyOn(service, "trackEvent");

      service.trackSectionView("about", "About Section");

      expect(trackEventSpy).toHaveBeenCalledWith({
        action: "section_view",
        category: "navigation",
        label: "About Section",
        customData: {
          section_id: "about",
          section_name: "About Section",
        },
      });
    });
  });

  describe("isEnabled", () => {
    it("should return true when enabled", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "true";
      service = new AnalyticsService();

      expect(service.isEnabled()).toBe(true);
    });

    it("should return false when disabled", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "false";
      service = new AnalyticsService();

      expect(service.isEnabled()).toBe(false);
    });
  });

  describe("setEnabled", () => {
    it("should enable/disable analytics", () => {
      process.env.REACT_APP_ANALYTICS_ENABLED = "false";
      service = new AnalyticsService();

      service.setEnabled(true);
      expect(service.isEnabled()).toBe(true);

      service.setEnabled(false);
      expect(service.isEnabled()).toBe(false);
    });
  });
});

describe("Convenience Functions", () => {
  beforeEach(() => {
    (global as any).window = mockWindow;
    (global as any).document = { title: "Test Page" };
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete (global as any).window;
    delete (global as any).document;
  });

  it("should export trackPageView function", () => {
    process.env.REACT_APP_ANALYTICS_ENABLED = "true";
    process.env.REACT_APP_ANALYTICS_TYPE = "google";
    process.env.REACT_APP_GA_MEASUREMENT_ID = "G-TEST123";

    const { trackPageView } = require("../analytics");
    trackPageView("/test", "Test");

    expect(mockWindow.gtag).toHaveBeenCalled();
  });
});
