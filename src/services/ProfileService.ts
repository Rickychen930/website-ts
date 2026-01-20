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
  bio: "Experienced in backend, mobile, and frontend development, with hands-on projects at Samsung R&D and Apple Developer Academy. Strong foundation in algorithms and competitive programming. Currently preparing for a Master of Artificial Intelligence at UTS, driven to build scalable tech with real-world impact.",
  academics: [],
  certifications: [],
  contacts: [
    {
      id: "contact-1",
      type: "email",
      value: "rickychen930@gmail.com",
      label: "Email",
      isPrimary: true,
    },
    {
      id: "contact-2",
      type: "linkedin",
      value: "https://www.linkedin.com/in/rickychen930",
      label: "LinkedIn",
      isPrimary: false,
    },
    {
      id: "contact-3",
      type: "github",
      value: "https://github.com/rickychen930",
      label: "GitHub",
      isPrimary: false,
    },
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Samsung R&D Institute – Jakarta",
      position: "Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isCurrent: false,
      description:
        "Enhanced SmartThings app functionality and performance. Developed TV Plugin for seamless smart TV integration, enabling device discovery, remote control, and status monitoring. Contributed to One UI 6 enhancements, improving UI/UX and accessibility across devices. Focused on TypeScript, modular architecture, and scalable design. Worked in an Agile environment with cross-functional teams.",
      achievements: [
        "Developed TV Plugin for SmartThings enabling device discovery, remote control, and status monitoring",
        "Contributed to One UI 6 enhancements improving UI/UX and accessibility",
        "Improved user experience for millions of SmartThings users worldwide",
        "Implemented scalable architecture using TypeScript and Node.js",
      ],
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
        "Git",
        "Agile",
        "Scrum",
      ],
      skillIds: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Git",
        "GitHub",
        "Backend Development",
      ],
    },
    {
      id: "exp-2",
      company: "Apple Developer Academy – Tangerang",
      position: "Software Engineer",
      location: "Tangerang, Indonesia",
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isCurrent: false,
      description:
        "Mastered Swift, UIKit, SwiftUI, GitHub, and soft skills through intensive training program. Developed five projects including Phowto (photography tutorials), Reguards (women's travel safety), and Bottani (farm management with remote control). Participated in design thinking workshops, user research, and iterative development processes. Collaborated with designers and other developers to create user-centered applications.",
      achievements: [
        "Developed five iOS applications using Swift and SwiftUI",
        "Mastered iOS development lifecycle, app architecture, and best practices",
        "Participated in design thinking workshops and user research",
        "Collaborated effectively with designers and developers in cross-functional teams",
      ],
      technologies: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Xcode",
        "Git",
        "Core Data",
        "Core Location",
        "AVFoundation",
      ],
      skillIds: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Git",
        "GitHub",
        "iOS Development",
      ],
    },
  ],
  honors: [],
  languages: [],
  projects: [
    {
      id: "project-1",
      title: "giftforyou.idn",
      description:
        "A full-stack e-commerce platform for bouquet shopping in Indonesia.",
      longDescription:
        "A full-stack e-commerce platform for bouquet shopping in Indonesia. Built with React, TypeScript, Express.js, and MongoDB, featuring a modern and responsive user interface. The platform enables customers to browse, customize, and purchase bouquets with seamless payment integration and order tracking. Implemented RESTful API architecture, secure authentication, and efficient database design to ensure scalability and performance.",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack",
      startDate: "2025-01-01",
      isActive: true,
      githubUrl: "https://github.com/rickychen930/giftforyou.idn",
      achievements: [
        "Built production-ready e-commerce platform with modern tech stack",
        "Implemented secure authentication and payment integration",
        "Designed scalable RESTful API architecture",
        "Created responsive and user-friendly interface",
      ],
      architecture:
        "Full-stack architecture with React frontend, Express.js backend, and MongoDB database. RESTful API design with JWT authentication and secure payment processing.",
    },
    {
      id: "project-2",
      title: "TV Plugin – SmartThings",
      description:
        "Developed a TV control plugin for Samsung SmartThings app enabling device discovery, remote control, and status monitoring.",
      longDescription:
        "Developed a TV control plugin for Samsung SmartThings app. Enabled device discovery, remote control, and status monitoring for smart TVs. Contributed to One UI 6 enhancements and improved user experience for millions of users. Built with TypeScript, Node.js, and Samsung SmartThings SDK.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
      ],
      category: "backend",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isActive: false,
      achievements: [
        "Enabled device discovery and remote control for smart TVs",
        "Improved user experience for millions of SmartThings users worldwide",
        "Integrated seamlessly with SmartThings ecosystem",
        "Implemented modular and scalable architecture",
      ],
    },
    {
      id: "project-3",
      title: "Bottani",
      description:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time.",
      longDescription:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy using Swift, SwiftUI, and IoT integration.",
      technologies: ["Swift", "SwiftUI", "IoT", "Core Data", "Bluetooth"],
      category: "mobile",
      startDate: "2022-08-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Integrated IoT devices for real-time soil monitoring",
        "Implemented automated irrigation control system",
        "Created predictive analytics for crop management",
        "Built intuitive mobile interface for farmers",
      ],
    },
    {
      id: "project-4",
      title: "Kabisa",
      description:
        "An educational app introducing Sundanese script through game-based learning.",
      longDescription:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Presented in academic forums and published in IEEE. Built with Swift and SwiftUI, featuring interactive learning modules, gamification elements, and cultural preservation features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Game Development",
        "Education Technology",
      ],
      category: "mobile",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      isActive: false,
      githubUrl: "https://github.com/rickychen930/kabisa",
      achievements: [
        "Preserved traditional Sundanese script through gamification",
        "Presented research at academic forums and published in IEEE",
        "Created engaging interactive learning modules",
        "Promoted cultural preservation through technology",
      ],
    },
    {
      id: "project-5",
      title: "Reguards",
      description:
        "A women's travel safety app designed to enhance safety for women travelers.",
      longDescription:
        "A women's travel safety app developed during Apple Developer Academy. Designed to enhance safety for women travelers through real-time location sharing, emergency contacts, and safety alerts. Built with Swift and SwiftUI, featuring GPS tracking, emergency SOS functionality, and community safety features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Core Location",
        "AVFoundation",
        "GPS",
      ],
      category: "mobile",
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Implemented real-time GPS tracking and location sharing",
        "Created emergency SOS functionality for user safety",
        "Built community safety features and alerts",
        "Addressed real-world safety concerns through technology",
      ],
    },
    {
      id: "project-6",
      title: "Phowto",
      description:
        "A photography tutorial app providing interactive tutorials and guides for photography enthusiasts.",
      longDescription:
        "A photography tutorial app developed during Apple Developer Academy. Provides interactive tutorials and guides for photography enthusiasts. Built with Swift and SwiftUI, featuring video tutorials, step-by-step guides, and community features.",
      technologies: ["Swift", "SwiftUI", "AVFoundation", "Video Processing"],
      category: "mobile",
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      isActive: false,
      achievements: [
        "Created comprehensive photography learning platform",
        "Implemented video tutorial system",
        "Built step-by-step interactive guides",
        "Designed engaging user interface for learning",
      ],
    },
    {
      id: "project-7",
      title: "M-arkir",
      description:
        "A license plate recognition system using Python and OpenCV with Arduino integration.",
      longDescription:
        "A license plate recognition system using Python and OpenCV. Integrated with Arduino for hardware control, combining C++ and Python to enable real-time image processing and automated response. Built as a university project.",
      technologies: [
        "Python",
        "OpenCV",
        "Arduino",
        "C++",
        "Computer Vision",
        "OCR",
      ],
      category: "ai",
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      achievements: [
        "Implemented real-time license plate recognition using OpenCV",
        "Integrated computer vision with embedded systems",
        "Created automated gate control system",
        "Demonstrated expertise in computer vision and IoT integration",
      ],
    },
    {
      id: "project-8",
      title: "L-emot",
      description:
        "A smart lamp controller built with Arduino and custom hardware for wireless lighting control.",
      longDescription:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation.",
      technologies: ["Arduino", "C++", "Bluetooth", "IoT", "Embedded Systems"],
      category: "other",
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      achievements: [
        "Built custom hardware solution for smart lighting",
        "Implemented wireless control via Bluetooth",
        "Created energy monitoring features",
        "Demonstrated practical IoT application in home automation",
      ],
    },
  ],
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
        // Handle 404 (Profile not found) - use fallback data
        if (response.status === 404) {
          throw new Error("PROFILE_NOT_FOUND");
        }

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

      // Only use fallback in development mode when backend is truly unavailable
      // In production, always require database connection
      const isDevelopment = process.env.NODE_ENV === "development";
      const isBackendUnavailable =
        (errorMessage.includes("HTML instead of JSON") ||
          errorMessage.includes("Invalid response format") ||
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("NetworkError") ||
          errorMessage.includes("Network request failed") ||
          errorMessage.includes("fetch failed") ||
          errorMessage.includes("CORS") ||
          (error instanceof TypeError && error.message.includes("fetch"))) &&
        !errorMessage.includes("PROFILE_NOT_FOUND");

      // Only use fallback in development mode
      if (isBackendUnavailable && isDevelopment) {
        console.warn(
          "⚠️ Backend server unavailable, using fallback profile data (development mode only).\n" +
            "To enable full functionality with MongoDB Atlas, please:\n" +
            "1. Ensure MONGODB_URI is set in your .env file\n" +
            "2. Start the backend server: npm run server:watch\n" +
            "3. Seed the database: npm run seed\n" +
            `Backend URL: ${process.env.REACT_APP_API_URL || "http://localhost:4000"}`,
        );

        this.profile = ProfileModel.create(FALLBACK_PROFILE);
        this.cache = {
          data: this.profile,
          timestamp: Date.now(),
        };

        return this.profile;
      }

      // In production or when profile not found, throw error
      if (errorMessage === "PROFILE_NOT_FOUND") {
        throw new Error(
          "Profile not found in MongoDB Atlas database. Please run 'npm run seed' to populate the database with your profile data.",
        );
      }

      // In production, don't use fallback - require database connection
      if (!isDevelopment && isBackendUnavailable) {
        throw new Error(
          "Cannot connect to backend server. Please ensure the backend is running and connected to MongoDB Atlas.",
        );
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

  public async updateContacts(
    contacts: Array<{
      id?: string;
      type: "email" | "phone" | "linkedin" | "github" | "website" | "other";
      value: string;
      label: string;
      isPrimary: boolean;
    }>,
  ): Promise<ProfileModel> {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const apiEndpoint = `${apiUrl}/api/profile/contacts`;

      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ contacts }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to update contacts",
        }));
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`,
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Invalid response format. Expected JSON but received ${contentType}`,
        );
      }

      const data: Profile = await response.json();

      // Update cached profile
      this.profile = ProfileModel.create(data);
      this.cache = {
        data: this.profile,
        timestamp: Date.now(),
      };

      return this.profile;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update contact information";
      throw new Error(errorMessage);
    }
  }
}

export const profileService = new ProfileService();
