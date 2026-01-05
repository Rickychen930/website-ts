import { UserProfile } from "../types/user";

/**
 * MainController - Handles main page business logic
 * Follows Single Responsibility Principle (SRP)
 */
class MainController {
  private readonly NAVBAR_ITEMS: readonly string[] = [
    "About",
    "Academic",
    "Honors",
    "Certifications",
    "Skills",
    "Experience",
    "Projects",
    "Soft Skills",
    "Languages",
    "Contact",
  ] as const;

  private readonly DEFAULT_USER_NAME = "Ricky Chen";
  private readonly API_TIMEOUT = 10000; // 10 seconds

  /**
   * Get navbar items
   * @returns Array of navbar item labels
   */
  getNavbarItems(): string[] {
    return [...this.NAVBAR_ITEMS];
  }

  /**
   * Fetch user profile from API with error handling and timeout
   * @param userName - Optional user name, defaults to DEFAULT_USER_NAME
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
        
        if (!this.isValidUserProfile(data)) {
          console.error("❌ Invalid user profile data structure");
          return null;
        }

        return data;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError instanceof Error) {
          if (fetchError.name === "AbortError") {
            console.error("❌ Request timeout");
          } else {
            throw fetchError;
          }
        }
        throw fetchError;
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      return null;
    }
  }

  /**
   * Validate user profile structure
   * @param data - Data to validate
   * @returns boolean
   */
  private isValidUserProfile(data: unknown): data is UserProfile {
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

export default MainController;
