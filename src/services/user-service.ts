import { UserProfile } from "../types/user";
import { apiClient, ApiError } from "./api";
import { logError } from "../utils/logger";
import { ApiConfig } from "../constants";
import { ErrorMessages } from "../constants/strings";

/**
 * UserService - Service Layer (MVC Pattern)
 * Handles all user-related API operations
 * Follows Single Responsibility Principle (SRP)
 * Enhanced with professional error handling and caching
 * Follows DRY principle - Uses centralized config constants
 */
export class UserService {
  private readonly DEFAULT_USER_NAME = "Ricky Chen";
  private readonly CACHE_TIME = ApiConfig.CACHE_TIME;

  /**
   * Fetch user profile from API
   * @param userName - Optional user name
   * @returns Promise<UserProfile | null>
   */
  async getUserProfile(
    userName: string = this.DEFAULT_USER_NAME,
  ): Promise<UserProfile | null> {
    console.log(
      "[UserService.getUserProfile] ==========================================",
    );
    console.log("[UserService.getUserProfile] Starting...");
    console.log("[UserService.getUserProfile] User name:", userName);
    console.log(
      "[UserService.getUserProfile] Default user name:",
      this.DEFAULT_USER_NAME,
    );
    console.log(
      "[UserService.getUserProfile] Cache time:",
      this.CACHE_TIME,
      "ms",
    );

    try {
      const endpoint = `/api/${encodeURIComponent(userName)}`;
      console.log("[UserService.getUserProfile] Endpoint:", endpoint);
      console.log(
        "[UserService.getUserProfile] Encoded user name:",
        encodeURIComponent(userName),
      );

      console.log("[UserService.getUserProfile] Calling apiClient.get...");
      const response = await apiClient.get<UserProfile>(endpoint, {
        cacheTime: this.CACHE_TIME,
        retries: ApiConfig.RETRIES,
        timeout: ApiConfig.TIMEOUT,
      });

      console.log("[UserService.getUserProfile] ✅ API response received");
      console.log(
        "[UserService.getUserProfile] Response status:",
        response.status,
      );
      console.log(
        "[UserService.getUserProfile] Response data type:",
        typeof response.data,
      );
      console.log(
        "[UserService.getUserProfile] Response data:",
        response.data ? "exists" : "null/undefined",
      );

      const data = response.data;

      console.log("[UserService.getUserProfile] Validating profile data...");
      const isValid = this.isValidProfile(data);
      console.log(
        "[UserService.getUserProfile] Profile validation result:",
        isValid,
      );

      if (!isValid) {
        console.error(
          "[UserService.getUserProfile] ❌ Profile validation failed",
        );
        console.error("[UserService.getUserProfile] Data:", data);
        logError(ErrorMessages.LOAD_DATA_FAILED, { data }, "UserService");
        return null;
      }

      console.log(
        "[UserService.getUserProfile] ✅ Profile validated successfully",
      );
      console.log("[UserService.getUserProfile] Profile name:", data.name);
      console.log("[UserService.getUserProfile] Profile title:", data.title);
      console.log(
        "[UserService.getUserProfile] ==========================================",
      );
      return data;
    } catch (error) {
      console.error("[UserService.getUserProfile] ❌ Error occurred");
      const apiError = error as ApiError;
      console.error("[UserService.getUserProfile] Error details:", {
        message: apiError.message,
        status: apiError.status,
        code: apiError.code,
        originalError: apiError.originalError,
      });
      logError(
        ErrorMessages.LOAD_PROFILE_FAILED,
        {
          message: apiError.message,
          status: apiError.status,
          originalError: apiError.originalError,
        },
        "UserService",
      );
      console.log(
        "[UserService.getUserProfile] ==========================================",
      );
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
