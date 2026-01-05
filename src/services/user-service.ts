import { UserProfile } from "../types/user";

/**
 * UserService - Service Layer (MVC Pattern)
 * Handles all user-related API operations
 * Follows Single Responsibility Principle (SRP)
 */
export class UserService {
  private readonly API_TIMEOUT = 10000;
  private readonly DEFAULT_USER_NAME = "Ricky Chen";

  /**
   * Fetch user profile from API
   * @param userName - Optional user name
   * @returns Promise<UserProfile | null>
   */
  async getUserProfile(userName: string = this.DEFAULT_USER_NAME): Promise<UserProfile | null> {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      
      if (!apiUrl) {
        console.error("❌ REACT_APP_API_URL is not defined");
        return null;
      }

      const endpoint = `${apiUrl}/${encodeURIComponent(userName)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as UserProfile;
        
        if (!this.isValidProfile(data)) {
          console.error("❌ Invalid user profile data structure");
          return null;
        }

        return data;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          throw new Error("Request timeout");
        }
        throw fetchError;
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
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

