import { UserProfile } from "../types/user";
import { apiClient, ApiError } from "./api";
import { logError, logDebug, logInfo } from "../utils/logger";
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
    logDebug("Starting getUserProfile", { userName, cacheTime: this.CACHE_TIME }, "UserService");

    try {
      const endpoint = `/api/${encodeURIComponent(userName)}`;
      logDebug("Fetching user profile", { endpoint }, "UserService");

      const response = await apiClient.get<UserProfile>(endpoint, {
        cacheTime: this.CACHE_TIME,
        retries: ApiConfig.RETRIES,
        timeout: ApiConfig.TIMEOUT,
      });

      logDebug("API response received", { 
        status: response.status,
        hasData: !!response.data 
      }, "UserService");

      const data = response.data;

      logDebug("Validating profile data", undefined, "UserService");
      const isValid = this.isValidProfile(data);

      if (!isValid) {
        logError(ErrorMessages.LOAD_DATA_FAILED, { data }, "UserService");
        return null;
      }

      logInfo("Profile loaded successfully", { 
        name: data.name, 
        title: data.title 
      }, "UserService");
      
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      logError(
        ErrorMessages.LOAD_PROFILE_FAILED,
        {
          message: apiError.message,
          status: apiError.status,
          code: apiError.code,
          originalError: apiError.originalError,
        },
        "UserService",
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
