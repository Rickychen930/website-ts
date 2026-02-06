/**
 * Admin Controller - Login and dashboard stats
 */

import { Request, Response } from "express";
import { ProfileModel } from "../models/Profile";
import { ContactMessageModel } from "../models/ContactMessage";

export class AdminController {
  public async login(req: Request, res: Response): Promise<void> {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      res.status(503).json({
        success: false,
        error: "Admin not configured",
        message: "ADMIN_SECRET is not set on the server.",
      });
      return;
    }

    const { secret: bodySecret } = req.body || {};
    if (bodySecret !== secret) {
      res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Invalid admin secret.",
      });
      return;
    }

    res.json({
      success: true,
      token: secret,
      message: "Login successful.",
    });
  }

  public async getStats(req: Request, res: Response): Promise<void> {
    try {
      const mongoose = require("mongoose");
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({
          error: "Database not connected",
          message: "MongoDB is not available.",
        });
        return;
      }

      const [profile, messageCount] = await Promise.all([
        ProfileModel.findOne().lean(),
        ContactMessageModel.countDocuments(),
      ]);

      const projectsCount = profile?.projects?.length ?? 0;
      const experiencesCount = profile?.experiences?.length ?? 0;
      const skillsCount =
        (profile?.technicalSkills?.length ?? 0) +
        (profile?.softSkills?.length ?? 0);
      const testimonialsCount = profile?.testimonials?.length ?? 0;
      const statsCount = profile?.stats?.length ?? 0;

      res.json({
        profileExists: !!profile,
        profileUpdatedAt: profile?.updatedAt ?? null,
        counts: {
          projects: projectsCount,
          experiences: experiencesCount,
          skills: skillsCount,
          testimonials: testimonialsCount,
          stats: statsCount,
          contactMessages: messageCount,
        },
      });
    } catch (error) {
      console.error("Admin getStats error:", error);
      res.status(500).json({
        error: "Failed to load stats",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
