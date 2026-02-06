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

      // Debug: Check database connection and collection
      const db = mongoose.connection.db;
      const dbName = db?.databaseName || "unknown";
      const collections = (await db?.listCollections().toArray()) || [];
      const profilesExists = collections.some(
        (c: { name: string }) => c.name === "profiles",
      );
      const profilesCount = profilesExists
        ? await db.collection("profiles").countDocuments()
        : 0;

      console.log(
        `[ProfileController] DB: ${dbName}, Collections: ${collections.map((c: { name: string }) => c.name).join(", ")}, Profiles count: ${profilesCount}`,
      );

      const profile = await ProfileModel.findOne();

      if (!profile) {
        res.status(404).json({
          error: "Profile not found",
          message:
            "No profile data found in MongoDB Atlas database. Please run 'npm run seed' to populate the database with your profile data.",
          debug: {
            database: dbName,
            collections: collections.map((c: { name: string }) => c.name),
            profilesCount,
            profilesCollectionExists: profilesExists,
          },
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

  /** Full profile update (admin only) */
  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const mongoose = require("mongoose");
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({
          error: "Database not connected",
          message: "MongoDB is not available.",
        });
        return;
      }

      const body = req.body as Record<string, unknown>;
      const {
        name,
        title,
        location,
        bio,
        academics,
        certifications,
        contacts,
        experiences,
        honors,
        languages,
        projects,
        softSkills,
        stats,
        technicalSkills,
        testimonials,
      } = body;

      if (!name || !title || !location || typeof bio !== "string") {
        res.status(400).json({
          error: "Invalid request",
          message: "name, title, location, and bio are required.",
        });
        return;
      }

      const profile = await ProfileModel.findOne();
      if (!profile) {
        res.status(404).json({
          error: "Profile not found",
          message: "No profile in database. Run npm run seed first.",
        });
        return;
      }

      profile.name = String(name);
      profile.title = String(title);
      profile.location = String(location);
      profile.bio = String(bio);
      profile.academics = Array.isArray(academics)
        ? academics
        : profile.academics;
      profile.certifications = Array.isArray(certifications)
        ? certifications
        : profile.certifications;
      profile.contacts = Array.isArray(contacts) ? contacts : profile.contacts;
      profile.experiences = Array.isArray(experiences)
        ? experiences
        : profile.experiences;
      profile.honors = Array.isArray(honors) ? honors : profile.honors;
      profile.languages = Array.isArray(languages)
        ? languages
        : profile.languages;
      profile.projects = Array.isArray(projects) ? projects : profile.projects;
      profile.softSkills = Array.isArray(softSkills)
        ? softSkills
        : profile.softSkills;
      profile.stats = Array.isArray(stats) ? stats : profile.stats;
      profile.technicalSkills = Array.isArray(technicalSkills)
        ? technicalSkills
        : profile.technicalSkills;
      profile.testimonials = Array.isArray(testimonials)
        ? testimonials
        : profile.testimonials;

      await profile.save();
      const transformed = transformProfile(profile);
      res.json(transformed);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        error: "Failed to update profile",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
