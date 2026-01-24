/**
 * Profile Controller - Backend MVC Controller
 * Handles HTTP requests for profile data
 */

import { Request, Response } from "express";
import { ProfileModel } from "../models/Profile";
import { transformProfile } from "../utils/transformProfile";

export class ProfileController {
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Check if MongoDB is connected
      const mongoose = require("mongoose");
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({
          error: "Database not connected",
          message:
            "MongoDB Atlas connection is not available. Please check your MONGODB_URI configuration.",
        });
        return;
      }

      const profile = await ProfileModel.findOne();

      if (!profile) {
        res.status(404).json({
          error: "Profile not found",
          message:
            "No profile data found in MongoDB Atlas database. Please run 'npm run seed' to populate the database with your profile data.",
        });
        return;
      }

      // Transform to match frontend Profile interface
      let transformed;
      try {
        transformed = transformProfile(profile);
      } catch (transformErr) {
        console.error("Profile transform error:", transformErr);
        throw transformErr;
      }
      res.json(transformed);
    } catch (error) {
      console.error("Error fetching profile from MongoDB Atlas:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error occurred while fetching from database";
      res.status(500).json({
        error: "Failed to fetch profile",
        message,
      });
    }
  }

  public async updateContacts(req: Request, res: Response): Promise<void> {
    try {
      const { contacts } = req.body;

      if (!Array.isArray(contacts)) {
        res.status(400).json({
          error: "Invalid request",
          message: "Contacts must be an array",
        });
        return;
      }

      // Validate contacts structure
      for (const contact of contacts) {
        if (
          !contact.type ||
          !contact.value ||
          !contact.label ||
          typeof contact.isPrimary !== "boolean"
        ) {
          res.status(400).json({
            error: "Invalid contact data",
            message:
              "Each contact must have type, value, label, and isPrimary fields",
          });
          return;
        }

        const validTypes = [
          "email",
          "phone",
          "linkedin",
          "github",
          "website",
          "other",
        ];
        if (!validTypes.includes(contact.type)) {
          res.status(400).json({
            error: "Invalid contact type",
            message: `Contact type must be one of: ${validTypes.join(", ")}`,
          });
          return;
        }
      }

      // Ensure only one primary contact
      const primaryCount = contacts.filter((c) => c.isPrimary).length;
      if (primaryCount !== 1) {
        res.status(400).json({
          error: "Invalid contact configuration",
          message: "Exactly one contact must be marked as primary",
        });
        return;
      }

      const profile = await ProfileModel.findOne();

      if (!profile) {
        res.status(404).json({
          error: "Profile not found",
          message:
            "No profile data found in database. Please run 'npm run seed' to populate the database.",
        });
        return;
      }

      // Update contacts (remove id fields before saving)
      profile.contacts = contacts.map(({ id, ...contact }) => contact);
      await profile.save();

      // Transform and return updated profile
      const transformed = transformProfile(profile);
      res.json(transformed);
    } catch (error) {
      console.error("Error updating contacts:", error);
      res.status(500).json({
        error: "Failed to update contacts",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
