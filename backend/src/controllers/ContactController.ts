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

  /** List contact messages (admin only) */
  public async listContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(
        parseInt(String(req.query.limit), 10) || 50,
        200,
      );
      const skip = Math.max(parseInt(String(req.query.skip), 10) || 0, 0);

      const [messages, total] = await Promise.all([
        ContactMessageModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        ContactMessageModel.countDocuments(),
      ]);

      const list = messages.map((doc: Record<string, unknown>) => {
        const id = (doc._id as { toString?: () => string })?.toString?.();
        if (id) {
          doc.id = id;
        }
        delete doc._id;
        delete doc.__v;
        return doc;
      });

      res.json({
        items: list,
        total,
        limit,
        skip,
      });
    } catch (error) {
      console.error("Error listing contact messages:", error);
      res.status(500).json({
        error: "Failed to list messages",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /** Delete a contact message (admin only) */
  public async deleteContactMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mongoose = require("mongoose");
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid message id" });
        return;
      }
      const deleted = await ContactMessageModel.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ error: "Message not found" });
        return;
      }
      res.json({ success: true, message: "Message deleted" });
    } catch (error) {
      console.error("Error deleting contact message:", error);
      res.status(500).json({
        error: "Failed to delete message",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
