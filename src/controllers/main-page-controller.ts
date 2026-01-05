import { UserService } from "../services/user-service";
import { SectionManager, ISectionConfig } from "../models/section-model";
import { UserProfile } from "../types/user";

/**
 * MainPageController - Controller Layer (MVC Pattern)
 * Orchestrates business logic for main page
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP) - Depends on abstractions
 */
export class MainPageController {
  private readonly userService: UserService;
  private readonly sectionManager: SectionManager;
  private readonly navbarItems: readonly string[] = [
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

  constructor(userService?: UserService, sectionManager?: SectionManager) {
    this.userService = userService || new UserService();
    this.sectionManager = sectionManager || new SectionManager();
  }

  /**
   * Initialize sections configuration
   * Follows Open/Closed Principle (OCP) - Easy to extend
   */
  initializeSections(sections: ISectionConfig[]): void {
    this.sectionManager.registerSections(sections);
  }

  /**
   * Get user profile
   * @param userName - Optional user name
   * @returns Promise<UserProfile | null>
   */
  async getUserProfile(userName?: string): Promise<UserProfile | null> {
    try {
      return await this.userService.getUserProfile(userName);
    } catch (error) {
      console.error("Failed to load user profile:", error);
      return null;
    }
  }

  /**
   * Get navbar items
   * @returns Array of navbar item labels
   */
  getNavbarItems(): string[] {
    return [...this.navbarItems];
  }

  /**
   * Get visible sections for profile
   * @param profile - User profile
   * @returns Array of visible section configurations
   */
  getVisibleSections(profile: UserProfile): ISectionConfig[] {
    return this.sectionManager.getVisibleSections(profile);
  }

  /**
   * Get section by ID
   * @param id - Section ID
   * @returns Section configuration or undefined
   */
  getSectionById(id: string): ISectionConfig | undefined {
    return this.sectionManager.getSectionById(id);
  }
}

