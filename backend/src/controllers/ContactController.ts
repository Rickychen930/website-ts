/**
 * Contact Controller - Backend MVC Controller
 * Handles contact form submissions
 */

import { Request, Response } from "express";
import { ContactMessageModel } from "../models/ContactMessage";
import { validationResult } from "express-validator";

export class ContactController {
  public async submitContact(req: Request, res: Response): Promise<void> {
    try {
      // Validation is now handled by middleware, but keep as fallback
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const { name, email, message } = req.body;

      // Create contact message
      const contactMessage = new ContactMessageModel({
        name,
        email,
        message,
      });

      await contactMessage.save();

      res.status(201).json({
        success: true,
        message: "Thank you for your message. I will get back to you soon!",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({
        success: false,
        error: "Failed to submit contact form",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
