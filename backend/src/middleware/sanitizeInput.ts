/**
 * Input Sanitization Middleware
 * Sanitizes user input to prevent XSS attacks
 */

import { Request, Response, NextFunction } from "express";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a JSDOM window for DOMPurify (server-side)
const window = new JSDOM("").window;
// DOMPurify requires Window type but JSDOM provides a compatible interface
// Cast to unknown first, then to the expected type to satisfy TypeScript
const purify = DOMPurify(window as unknown as Window & typeof globalThis);

/**
 * Type for sanitizable values
 */
type SanitizableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SanitizableObject
  | SanitizableValue[];
type SanitizableObject = { [key: string]: SanitizableValue };

/**
 * Recursively sanitize object values
 */
const sanitizeObject = (obj: SanitizableValue): SanitizableValue => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    // Sanitize HTML and remove potentially dangerous content
    return purify.sanitize(obj, {
      ALLOWED_TAGS: [], // Remove all HTML tags
      ALLOWED_ATTR: [], // Remove all attributes
    });
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  if (typeof obj === "object" && obj !== null && obj.constructor === Object) {
    const sanitized: SanitizableObject = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject((obj as SanitizableObject)[key]);
      }
    }
    return sanitized;
  }

  return obj;
};

/**
 * Middleware to sanitize request body, query, and params
 */
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.body) {
    req.body = sanitizeObject(req.body) as typeof req.body;
  }
  if (req.query) {
    const sanitized = sanitizeObject(req.query);
    if (sanitized !== undefined && sanitized !== null) {
      req.query = sanitized as typeof req.query;
    }
  }
  if (req.params) {
    const sanitized = sanitizeObject(req.params);
    if (sanitized !== undefined && sanitized !== null) {
      req.params = sanitized as typeof req.params;
    }
  }
  next();
};
