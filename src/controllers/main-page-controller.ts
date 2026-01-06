import { UserService } from "../services/user-service";
import { SectionManager, ISectionConfig } from "../models/section-model";
import { UserProfile } from "../types/user";
import { logError } from "../utils/logger";
import { NavbarItemType, NavbarDropdownItem } from "../types/navbar";

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
      logError("Failed to load user profile", error, "MainPageController");
      return null;
    }
  }

  /**
   * Get navbar items (legacy method for backward compatibility)
   * @returns Array of navbar item labels
   */
  getNavbarItems(): string[] {
    return [...this.navbarItems];
  }

  /**
   * Get navbar items with dropdown structure
   * Groups items logically for professional, clean header
   * @returns Array of navbar items with dropdowns
   */
  getNavbarItemsWithDropdowns(): NavbarItemType[] {
    return [
      { id: "nav-item-about", label: "About", href: "#about" },
      {
        id: "nav-item-education",
        label: "Education",
        href: "#education",
        children: [
          { id: "nav-item-academic", label: "Academic", href: "#academic" },
          { id: "nav-item-honors", label: "Honors", href: "#honors" },
          { id: "nav-item-certifications", label: "Certifications", href: "#certifications" },
        ],
      } as NavbarDropdownItem,
      {
        id: "nav-item-skills",
        label: "Skills",
        href: "#skills",
        children: [
          { id: "nav-item-technical-skills", label: "Technical Skills", href: "#skills" },
          { id: "nav-item-soft-skills", label: "Soft Skills", href: "#soft-skills" },
          { id: "nav-item-languages", label: "Languages", href: "#languages" },
        ],
      } as NavbarDropdownItem,
      { id: "nav-item-experience", label: "Experience", href: "#experience" },
      { id: "nav-item-projects", label: "Projects", href: "#projects" },
      { id: "nav-item-contact", label: "Contact", href: "#contact" },
    ];
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

