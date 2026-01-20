/**
 * Contact Routes - API route definitions
 */

import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ContactController } from "../controllers/ContactController";
import { contactLimiter } from "../middleware/rateLimiter";

const router = Router();
const contactController = new ContactController();

// Validation middleware
const validateContactForm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

// Validation error handler middleware
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      errors: errors.array(),
    });
    return;
  }
  next();
};

router.post(
  "/",
  contactLimiter, // Apply strict rate limiting to contact form
  validateContactForm,
  handleValidationErrors, // Handle validation errors
  (req: Request, res: Response) => contactController.submitContact(req, res),
);

export default router;
