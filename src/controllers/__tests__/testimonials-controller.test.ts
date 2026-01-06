/**
 * Unit tests for Testimonials Controller
 */

import {
  TestimonialsController,
  ITestimonial,
} from "../testimonials-controller";

describe("TestimonialsController", () => {
  let controller: TestimonialsController;

  beforeEach(() => {
    controller = new TestimonialsController();
  });

  describe("getDefaultTestimonials", () => {
    it("should return array of default testimonials", () => {
      const testimonials = controller.getDefaultTestimonials();

      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.length).toBeGreaterThan(0);
      expect(testimonials[0]).toHaveProperty("key");
      expect(testimonials[0]).toHaveProperty("name");
      expect(testimonials[0]).toHaveProperty("role");
      expect(testimonials[0]).toHaveProperty("company");
      expect(testimonials[0]).toHaveProperty("text");
    });

    it("should return testimonials with valid structure", () => {
      const testimonials = controller.getDefaultTestimonials();

      testimonials.forEach((testimonial) => {
        expect(testimonial.key).toBeDefined();
        expect(testimonial.name).toBeDefined();
        expect(testimonial.role).toBeDefined();
        expect(testimonial.company).toBeDefined();
        expect(testimonial.text).toBeDefined();
        expect(testimonial.text.length).toBeGreaterThanOrEqual(20);
      });
    });
  });

  describe("validateTestimonial", () => {
    it("should validate correct testimonial", () => {
      const validTestimonial: ITestimonial = {
        key: "test-1",
        name: "John Doe",
        role: "Senior Engineer",
        company: "Tech Corp",
        text: "This is a valid testimonial text with enough characters.",
      };

      expect(controller.validateTestimonial(validTestimonial)).toBe(true);
    });

    it("should reject testimonial without key", () => {
      const invalidTestimonial = {
        name: "John Doe",
        role: "Senior Engineer",
        company: "Tech Corp",
        text: "Valid text",
      };

      expect(controller.validateTestimonial(invalidTestimonial as any)).toBe(
        false,
      );
    });

    it("should reject testimonial without name", () => {
      const invalidTestimonial = {
        key: "test-1",
        role: "Senior Engineer",
        company: "Tech Corp",
        text: "Valid text",
      };

      expect(controller.validateTestimonial(invalidTestimonial as any)).toBe(
        false,
      );
    });

    it("should reject testimonial with text too short", () => {
      const invalidTestimonial: ITestimonial = {
        key: "test-1",
        name: "John Doe",
        role: "Senior Engineer",
        company: "Tech Corp",
        text: "Short",
      };

      expect(controller.validateTestimonial(invalidTestimonial)).toBe(false);
    });

    it("should accept testimonial with optional fields", () => {
      const validTestimonial: ITestimonial = {
        key: "test-1",
        name: "John Doe",
        role: "Senior Engineer",
        company: "Tech Corp",
        text: "This is a valid testimonial text with enough characters.",
        rating: 5,
        date: "2024",
        link: "https://linkedin.com/in/johndoe",
      };

      expect(controller.validateTestimonial(validTestimonial)).toBe(true);
    });
  });

  describe("getTestimonials", () => {
    it("should return custom testimonials when provided", () => {
      const customTestimonials: ITestimonial[] = [
        {
          key: "custom-1",
          name: "Jane Smith",
          role: "Manager",
          company: "Company Inc",
          text: "This is a custom testimonial with enough characters.",
        },
      ];

      const result = controller.getTestimonials(customTestimonials);

      expect(result).toEqual(customTestimonials);
    });

    it("should return default testimonials when no custom provided", () => {
      const result = controller.getTestimonials();

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].key).toBeDefined();
    });

    it("should filter out invalid custom testimonials", () => {
      const customTestimonials: ITestimonial[] = [
        {
          key: "valid-1",
          name: "Valid User",
          role: "Engineer",
          company: "Tech",
          text: "This is a valid testimonial with enough characters.",
        },
        {
          key: "invalid-1",
          name: "Invalid",
          role: "Engineer",
          company: "Tech",
          text: "Short", // Too short
        },
      ];

      const result = controller.getTestimonials(customTestimonials);

      expect(result.length).toBe(1);
      expect(result[0].key).toBe("valid-1");
    });

    it("should return empty array when all custom testimonials are invalid", () => {
      const invalidTestimonials: ITestimonial[] = [
        {
          key: "invalid-1",
          name: "Invalid",
          role: "Engineer",
          company: "Tech",
          text: "Short",
        },
      ];

      const result = controller.getTestimonials(invalidTestimonials);

      expect(result.length).toBe(0);
    });
  });
});
