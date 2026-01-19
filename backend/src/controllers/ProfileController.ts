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
      const profile = await ProfileModel.findOne();

      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }

      // Transform to match frontend Profile interface
      const transformed = transformProfile(profile);
      res.json(transformed);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({
        error: "Failed to fetch profile",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
