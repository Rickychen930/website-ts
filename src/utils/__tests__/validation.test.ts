/**
 * Unit tests for Validation Utilities
 */

import {
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isRequired,
  minLength,
  maxLength,
  matchesPattern,
  isInRange,
  validate,
  ValidationRules,
  validateForm,
} from "../validation";

describe("Validation Utilities", () => {
  describe("isValidEmail", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com/path")).toBe(true);
      expect(isValidUrl("https://example.com:8080/path?query=1")).toBe(true);
    });

    it("should reject invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });
  });

  describe("isValidPhone", () => {
    it("should validate correct phone numbers", () => {
      expect(isValidPhone("1234567890")).toBe(true);
      expect(isValidPhone("+1-234-567-8900")).toBe(true);
      expect(isValidPhone("(123) 456-7890")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(isValidPhone("123")).toBe(false);
      expect(isValidPhone("abc123")).toBe(false);
      expect(isValidPhone("")).toBe(false);
    });
  });

  describe("isRequired", () => {
    it("should validate required values", () => {
      expect(isRequired("text")).toBe(true);
      expect(isRequired(["item"])).toBe(true);
      expect(isRequired(0)).toBe(true);
      expect(isRequired(false)).toBe(true);
    });

    it("should reject empty values", () => {
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
      expect(isRequired("")).toBe(false);
      expect(isRequired("   ")).toBe(false);
      expect(isRequired([])).toBe(false);
    });
  });

  describe("minLength", () => {
    it("should validate minimum length", () => {
      expect(minLength("hello", 3)).toBe(true);
      expect(minLength("hello", 5)).toBe(true);
      expect(minLength(["a", "b"], 2)).toBe(true);
    });

    it("should reject values below minimum length", () => {
      expect(minLength("hi", 3)).toBe(false);
      expect(minLength(["a"], 2)).toBe(false);
    });
  });

  describe("maxLength", () => {
    it("should validate maximum length", () => {
      expect(maxLength("hello", 10)).toBe(true);
      expect(maxLength("hello", 5)).toBe(true);
      expect(maxLength(["a", "b"], 3)).toBe(true);
    });

    it("should reject values above maximum length", () => {
      expect(maxLength("hello world", 5)).toBe(false);
      expect(maxLength(["a", "b", "c"], 2)).toBe(false);
    });
  });

  describe("matchesPattern", () => {
    it("should validate pattern matches", () => {
      expect(matchesPattern("abc123", /^[a-z0-9]+$/)).toBe(true);
      expect(matchesPattern("HELLO", /^[A-Z]+$/)).toBe(true);
    });

    it("should reject pattern mismatches", () => {
      expect(matchesPattern("abc-123", /^[a-z0-9]+$/)).toBe(false);
      expect(matchesPattern("hello", /^[A-Z]+$/)).toBe(false);
    });
  });

  describe("isInRange", () => {
    it("should validate numbers in range", () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    it("should reject numbers outside range", () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
      expect(isInRange(NaN, 1, 10)).toBe(false);
    });
  });

  describe("validate", () => {
    it("should validate with multiple rules", () => {
      const rules = [
        ValidationRules.required(),
        ValidationRules.minLength(3),
        ValidationRules.maxLength(10),
      ];

      const result = validate("hello", rules);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should return errors for invalid values", () => {
      const rules = [ValidationRules.required(), ValidationRules.minLength(5)];

      const result = validate("hi", rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("validateForm", () => {
    it("should validate form data", () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
      };

      const rules = {
        name: [ValidationRules.required(), ValidationRules.minLength(2)],
        email: [ValidationRules.required(), ValidationRules.email()],
      };

      const result = validateForm(data, rules);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should return field-specific errors", () => {
      const data = {
        name: "",
        email: "invalid-email",
      };

      const rules = {
        name: [ValidationRules.required()],
        email: [ValidationRules.required(), ValidationRules.email()],
      };

      const result = validateForm(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.fieldErrors.name).toBeDefined();
      expect(result.fieldErrors.email).toBeDefined();
    });
  });
});
