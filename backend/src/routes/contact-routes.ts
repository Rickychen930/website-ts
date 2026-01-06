/**
 * Contact Routes
 * API routes for contact form
 * Enhanced with express-validator for proper input validation and sanitization
 */

import express, { Router } from "express";
import { body, validationResult } from "express-validator";
import { createContactMessage } from "../controllers/contact-controller";
import { logger } from "../utils/logger";
import { contactFormRateLimiter } from "../middleware/rate-limiter";

const router = Router();

// Apply rate limiting to all contact routes
router.use(contactFormRateLimiter.middleware());

/**
 * Validation middleware for contact form
 */
const contactFormValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("Name contains invalid characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must be less than 255 characters"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Subject must be between 3 and 200 characters")
    .escape(), // Sanitize HTML

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be between 10 and 5000 characters")
    .escape(), // Sanitize HTML
];

/**
 * POST /api/contact
 * Submit contact form
 */
router.post(
  "/",
  contactFormValidation,
  async (req: express.Request, res: express.Response) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          errors: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;

      // Create contact message (data already validated and sanitized)
      const contactMessage = await createContactMessage({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      });

      res.status(201).json({
        success: true,
        message: "Contact message submitted successfully",
        id: contactMessage._id,
      });
    } catch (error) {
      logger.error("Error in contact form submission", error, "ContactRoutes");

      if (error instanceof Error) {
        // Validation errors
        if (
          error.message.includes("required") ||
          error.message.includes("Invalid")
        ) {
          return res.status(400).json({ error: error.message });
        }
      }

      res.status(500).json({
        error: "Failed to submit contact message. Please try again later.",
      });
    }
  },
);

export default router;
