import { UserProfile } from "../types/user";
import { apiClient, ApiError } from "./api";

/**
 * UserService - Service Layer (MVC Pattern)
 * Handles all user-related API operations
 * Follows Single Responsibility Principle (SRP)
 * Enhanced with professional error handling and caching
 */
export class UserService {
  private readonly DEFAULT_USER_NAME = "Ricky Chen";
  private readonly CACHE_TIME = 5 * 60 * 1000; // 5 minutes cache

  /**
   * Fetch user profile from API
   * @param userName - Optional user name
   * @returns Promise<UserProfile | null>
   */
  async getUserProfile(userName: string = this.DEFAULT_USER_NAME): Promise<UserProfile | null> {
    try {
      const endpoint = `/${encodeURIComponent(userName)}`;
      
      const response = await apiClient.get<UserProfile>(endpoint, {
        cacheTime: this.CACHE_TIME,
        retries: 3,
        timeout: 15000,
      });

      const data = response.data;
      
      if (!this.isValidProfile(data)) {
        console.error("❌ Invalid user profile data structure");
        return null;
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("❌ Error fetching user profile:", {
        message: apiError.message,
        status: apiError.status,
        originalError: apiError.originalError,
      });
      throw error;
    }
  }

  /**
   * Validate user profile structure
   * @param data - Data to validate
   * @returns boolean
   */
  private isValidProfile(data: unknown): data is UserProfile {
    if (!data || typeof data !== "object") return false;
    
    const profile = data as Partial<UserProfile>;
    return (
      typeof profile.name === "string" &&
      typeof profile.title === "string" &&
      typeof profile.location === "string" &&
      typeof profile.bio === "string" &&
      Array.isArray(profile.stats) &&
      Array.isArray(profile.academics) &&
      Array.isArray(profile.certifications) &&
      Array.isArray(profile.contacts) &&
      Array.isArray(profile.honors) &&
      Array.isArray(profile.languages) &&
      Array.isArray(profile.projects) &&
      Array.isArray(profile.softSkills) &&
      Array.isArray(profile.technicalSkills) &&
      Array.isArray(profile.experiences)
    );
  }
}

