/**
 * Client-Side Validation Utilities
 * Reusable validation functions for forms and inputs
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationRule {
  validator: (value: unknown) => boolean;
  message: string;
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Phone number validation (basic)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;

  // Remove common phone number characters
  const cleaned = phone.replace(/[\s\-()+]/g, "");

  // Check if it's all digits and has reasonable length
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Required field validation
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Min length validation
 */
export function minLength(value: string | unknown[], min: number): boolean {
  if (typeof value === "string") {
    return value.trim().length >= min;
  }
  if (Array.isArray(value)) {
    return value.length >= min;
  }
  return false;
}

/**
 * Max length validation
 */
export function maxLength(value: string | unknown[], max: number): boolean {
  if (typeof value === "string") {
    return value.length <= max;
  }
  if (Array.isArray(value)) {
    return value.length <= max;
  }
  return false;
}

/**
 * Pattern validation (regex)
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  if (typeof value !== "string") return false;
  return pattern.test(value);
}

/**
 * Number range validation
 */
export function isInRange(value: number, min: number, max: number): boolean {
  if (typeof value !== "number" || isNaN(value)) return false;
  return value >= min && value <= max;
}

/**
 * Validate with multiple rules
 */
export function validate(
  value: unknown,
  rules: ValidationRule[],
): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validator(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (message: string = "This field is required"): ValidationRule => ({
    validator: isRequired,
    message,
  }),

  email: (message: string = "Invalid email format"): ValidationRule => ({
    validator: (value) => typeof value === "string" && isValidEmail(value),
    message,
  }),

  url: (message: string = "Invalid URL format"): ValidationRule => ({
    validator: (value) => typeof value === "string" && isValidUrl(value),
    message,
  }),

  phone: (message: string = "Invalid phone number"): ValidationRule => ({
    validator: (value) => typeof value === "string" && isValidPhone(value),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (value) => minLength(value as string | unknown[], min),
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validator: (value) => maxLength(value as string | unknown[], max),
    message: message || `Must be less than ${max} characters`,
  }),

  pattern: (pattern: RegExp, message: string): ValidationRule => ({
    validator: (value) =>
      typeof value === "string" && matchesPattern(value, pattern),
    message,
  }),

  range: (min: number, max: number, message?: string): ValidationRule => ({
    validator: (value) =>
      typeof value === "number" && isInRange(value, min, max),
    message: message || `Must be between ${min} and ${max}`,
  }),
};

/**
 * Validate form data
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ValidationRule[]>,
): ValidationResult & { fieldErrors: Record<keyof T, string[]> } {
  const errors: string[] = [];
  const fieldErrors = {} as Record<keyof T, string[]>;

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field as keyof T];
    const result = validate(value, fieldRules);

    if (!result.isValid) {
      fieldErrors[field as keyof T] = result.errors;
      errors.push(...result.errors);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors: fieldErrors as Record<keyof T, string[]>,
  };
}
