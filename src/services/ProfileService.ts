/**
 * Profile Service - Business logic layer
 * Version 4: Added fallback data when backend is unavailable
 */

import { ProfileModel } from "@/models/ProfileModel";
import type { Profile } from "@/types/domain";

interface CacheEntry {
  data: ProfileModel;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Fallback profile data when backend is unavailable
const FALLBACK_PROFILE: Profile = {
  id: "fallback-profile",
  name: "Ricky Chen",
  title: "Software Engineer & AI Researcher",
  location: "Sydney, Australia",
  bio: "Experienced software engineer specializing in full-stack development, AI/ML applications, and modern software architecture. Passionate about building scalable systems and solving complex problems with elegant solutions.",
  academics: [],
  certifications: [],
  contacts: [
    {
      id: "contact-1",
      type: "email",
      value: "ricky.chen@example.com",
      label: "Email",
      isPrimary: true,
    },
  ],
  experiences: [],
  honors: [],
  languages: [],
  projects: [],
  softSkills: [],
  stats: [],
  technicalSkills: [],
  testimonials: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export class ProfileService {
  private profile: ProfileModel | null = null;
  private cache: CacheEntry | null = null;

  private async fetchWithRetry(
    url: string,
    retries: number = MAX_RETRIES,
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        if (
          text.trim().startsWith("<!DOCTYPE") ||
          text.trim().startsWith("<html")
        ) {
          throw new Error(
            `Server returned HTML instead of JSON. The backend server may not be running or the API endpoint is incorrect. URL: ${url}`,
          );
        }
        throw new Error(
          `Expected JSON but received ${contentType}. Response: ${text.substring(0, 100)}`,
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText.substring(0, 200)}`,
        );
      }

      return response;
    } catch (error) {
      if (
        retries > 0 &&
        !(
          error instanceof Error &&
          error.message.includes("HTML instead of JSON")
        )
      ) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return this.fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  }

  private isCacheValid(): boolean {
    if (!this.cache) {
      return false;
    }
    const now = Date.now();
    return now - this.cache.timestamp < CACHE_DURATION;
  }

  public async fetchProfile(): Promise<ProfileModel> {
    // Return cached data if valid
    if (this.isCacheValid() && this.cache) {
      return this.cache.data;
    }

    // Return in-memory profile if available
    if (this.profile) {
      return this.profile;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const apiEndpoint = `${apiUrl}/api/profile`;

      const response = await this.fetchWithRetry(apiEndpoint);

      // Double check content type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        await response.text(); // Consume response body
        throw new Error(
          `Invalid response format. Expected JSON but received ${contentType}. Make sure the backend server is running at ${apiUrl}`,
        );
      }

      const data: Profile = await response.json();

      this.profile = ProfileModel.create(data);
      this.cache = {
        data: this.profile,
        timestamp: Date.now(),
      };

      return this.profile;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch profile";

      // If backend is unavailable, use fallback data
      const isBackendUnavailable =
        errorMessage.includes("HTML instead of JSON") ||
        errorMessage.includes("Invalid response format") ||
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError") ||
        errorMessage.includes("Network request failed") ||
        errorMessage.includes("fetch failed") ||
        errorMessage.includes("CORS") ||
        (error instanceof TypeError && error.message.includes("fetch"));

      if (isBackendUnavailable) {
        console.warn(
          "⚠️ Backend server unavailable, using fallback profile data.\n" +
            "To enable full functionality, please start the backend server:\n" +
            `  npm run server:watch\n` +
            `  Or: npm run dev (runs both frontend and backend)\n` +
            `  Backend URL: ${process.env.REACT_APP_API_URL || "http://localhost:4000"}`,
        );

        // Use fallback data
        this.profile = ProfileModel.create(FALLBACK_PROFILE);
        this.cache = {
          data: this.profile,
          timestamp: Date.now(),
        };

        return this.profile;
      }

      throw new Error(errorMessage);
    }
  }

  public getProfile(): ProfileModel | null {
    return this.profile;
  }

  public clearCache(): void {
    this.profile = null;
    this.cache = null;
  }
}

export const profileService = new ProfileService();
