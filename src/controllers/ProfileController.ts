/**
 * Profile Controller - MVC Controller
 * Orchestrates view and service interactions
 */

import { ProfileService } from "@/services/ProfileService";
import { ProfileModel } from "@/models/ProfileModel";

export class ProfileController {
  private readonly profileService: ProfileService;

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  public async loadProfile(): Promise<ProfileModel> {
    return await this.profileService.fetchProfile();
  }

  public getProfile(): ProfileModel | null {
    return this.profileService.getProfile();
  }

  public getFeaturedProjects(count: number = 3): ProfileModel["projects"] {
    const profile = this.getProfile();
    if (!profile) {
      return [];
    }
    return profile.getFeaturedProjects(count);
  }

  public getSkillsByCategory(
    category:
      | "language"
      | "framework"
      | "database"
      | "tool"
      | "cloud"
      | "other",
  ) {
    const profile = this.getProfile();
    if (!profile) {
      return [];
    }
    return profile.getSkillsByCategory(category);
  }

  public getCurrentExperience() {
    const profile = this.getProfile();
    if (!profile) {
      return null;
    }
    return profile.getCurrentExperience();
  }
}
