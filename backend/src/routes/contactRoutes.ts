/**
 * Contact Routes - API route definitions
 */

import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { ContactController } from "../controllers/ContactController";

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

router.post("/", validateContactForm, (req: Request, res: Response) =>
  contactController.submitContact(req, res),
);

export default router;
