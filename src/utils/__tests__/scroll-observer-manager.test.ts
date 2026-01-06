/**
 * ScrollObserverManager Tests
 * White Box Testing for Scroll Observer
 */

import { ScrollObserverManager } from "../scroll-observer-manager";

describe("ScrollObserverManager", () => {
  let manager: ScrollObserverManager;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    manager = new ScrollObserverManager();
    mockCallback = jest.fn();
    manager.setSectionViewCallback(mockCallback);
  });

  afterEach(() => {
    manager.cleanup();
    jest.clearAllMocks();
  });

  describe("setSectionViewCallback", () => {
    it("should set callback function", () => {
      const callback = jest.fn();
      manager.setSectionViewCallback(callback);

      expect(callback).toBeDefined();
    });
  });

  describe("initialize", () => {
    it("should handle missing IntersectionObserver gracefully", () => {
      const originalIO = (global as any).IntersectionObserver;
      delete (global as any).IntersectionObserver;

      const element = document.createElement("div");
      element.id = "test-section";

      expect(() => manager.initialize([element])).not.toThrow();
      expect(element.classList.contains("revealed")).toBe(true);

      (global as any).IntersectionObserver = originalIO;
    });

    it("should initialize observer with elements", () => {
      const mockObserve = jest.fn();
      const mockDisconnect = jest.fn();

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          return {
            observe: mockObserve,
            disconnect: mockDisconnect,
          };
        });

      const element = document.createElement("div");
      element.id = "test-section";

      manager.initialize([element]);

      expect(mockObserve).toHaveBeenCalledWith(element);
    });

    it("should track section view when element intersects", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      element.id = "test-section";
      element.setAttribute("aria-label", "Test Section");

      manager.initialize([element]);

      // Simulate intersection
      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);

      expect(mockCallback).toHaveBeenCalledWith("test-section", "Test Section");
    });

    it("should not track duplicate sections", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      element.id = "test-section";

      manager.initialize([element]);

      // Simulate intersection twice
      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);
      observerCallback!([mockEntry as IntersectionObserverEntry]);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("should handle empty section ID gracefully", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      // No ID set

      manager.initialize([element]);

      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it("should extract section name from h2/h3 if no aria-label", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      element.id = "about-section";
      const h2 = document.createElement("h2");
      h2.textContent = "About Me";
      element.appendChild(h2);

      manager.initialize([element]);

      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);

      expect(mockCallback).toHaveBeenCalledWith("about-section", "About Me");
    });

    it("should format section ID as name if no other source", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      element.id = "about-me-section";

      manager.initialize([element]);

      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);

      expect(mockCallback).toHaveBeenCalledWith(
        "about-me-section",
        "About Me Section",
      );
    });
  });

  describe("cleanup", () => {
    it("should disconnect observer", () => {
      const mockDisconnect = jest.fn();

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation(() => {
          return {
            observe: jest.fn(),
            disconnect: mockDisconnect,
          };
        });

      const element = document.createElement("div");
      manager.initialize([element]);
      manager.cleanup();

      expect(mockDisconnect).toHaveBeenCalled();
    });

    it("should handle cleanup when no observer exists", () => {
      expect(() => manager.cleanup()).not.toThrow();
    });
  });

  describe("resetTrackedSections", () => {
    it("should reset tracked sections", () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;

      (global as any).IntersectionObserver = jest
        .fn()
        .mockImplementation((callback) => {
          observerCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
          };
        });

      const element = document.createElement("div");
      element.id = "test-section";

      manager.initialize([element]);

      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: element,
      };

      observerCallback!([mockEntry as IntersectionObserverEntry]);
      expect(mockCallback).toHaveBeenCalledTimes(1);

      manager.resetTrackedSections();

      observerCallback!([mockEntry as IntersectionObserverEntry]);
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });
  });
});
