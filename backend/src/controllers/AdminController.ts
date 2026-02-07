/**
 * Admin Controller - Login and dashboard stats
 * Login uses admin seeded in DB (password only on backend, hashed).
 */

import crypto from "crypto";
import { Request, Response } from "express";
import { ProfileModel } from "../models/Profile";
import { ContactMessageModel } from "../models/ContactMessage";
import { AppliedCompanyModel } from "../models/AppliedCompany";
import { SavedJobModel } from "../models/SavedJob";
import { TaskModel } from "../models/Task";
import { GoalModel } from "../models/Goal";
import { NoteModel } from "../models/Note";
import { AdminModel } from "../models/Admin";
import { verifyAdminPassword } from "../seed/seedAdmin";

export class AdminController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const admin = await AdminModel.findOne().lean();
      if (!admin) {
        res.status(503).json({
          success: false,
          error: "Admin not configured",
          message: "Run seed to create admin (npm run seed).",
        });
        return;
      }

      const { secret: bodySecret } = req.body || {};
      if (!bodySecret || typeof bodySecret !== "string") {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "Invalid admin secret.",
        });
        return;
      }

      const valid = verifyAdminPassword(
        bodySecret,
        admin.salt,
        admin.passwordHash,
      );
      if (!valid) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "Invalid admin secret.",
        });
        return;
      }

      const token = crypto.randomUUID();
      await AdminModel.updateOne({ _id: admin._id }, { $set: { token } });

      res.json({
        success: true,
        token,
        message: "Login successful.",
      });
    } catch (err) {
      console.error("Admin login error:", err);
      res.status(500).json({
        success: false,
        error: "Login failed",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
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

      const [
        profile,
        messageCount,
        companiesCount,
        savedJobsCount,
        tasksCount,
        goalsCount,
        notesCount,
      ] = await Promise.all([
        ProfileModel.findOne().lean(),
        ContactMessageModel.countDocuments(),
        AppliedCompanyModel.countDocuments(),
        SavedJobModel.countDocuments(),
        TaskModel.countDocuments(),
        GoalModel.countDocuments(),
        NoteModel.countDocuments(),
      ]);

      const projectsCount = profile?.projects?.length ?? 0;
      const experiencesCount = profile?.experiences?.length ?? 0;
      const skillsCount =
        (profile?.technicalSkills?.length ?? 0) +
        (profile?.softSkills?.length ?? 0);
      const testimonialsCount = profile?.testimonials?.length ?? 0;
      const statsCount = profile?.stats?.length ?? 0;
      const academicsCount = profile?.academics?.length ?? 0;
      const certificationsCount = profile?.certifications?.length ?? 0;
      const honorsCount = profile?.honors?.length ?? 0;
      const profileContactsCount = profile?.contacts?.length ?? 0;
      const languagesCount = profile?.languages?.length ?? 0;

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
          appliedCompanies: companiesCount,
          savedJobs: savedJobsCount,
          tasks: tasksCount,
          goals: goalsCount,
          notes: notesCount,
          academics: academicsCount,
          certifications: certificationsCount,
          honors: honorsCount,
          profileContacts: profileContactsCount,
          languages: languagesCount,
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
