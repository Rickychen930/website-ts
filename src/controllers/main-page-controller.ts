import { UserService } from "../services/user-service";
import { SectionManager, ISectionConfig } from "../models/section-model";
import { UserProfile } from "../types/user";
import { logError } from "../utils/logger";
import { NavbarItemType, NavbarDropdownItem } from "../types/navbar";
import { 
  SectionNames, 
  NavLabels, 
  NavIds, 
  SectionHrefs,
  ErrorMessages 
} from "../constants";

/**
 * MainPageController - Controller Layer (MVC Pattern)
 * Orchestrates business logic for main page
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP) - Depends on abstractions
 * Follows DRY principle - Uses centralized constants
 */
export class MainPageController {
  private readonly userService: UserService;
  private readonly sectionManager: SectionManager;
  private readonly navbarItems: readonly string[] = [
    SectionNames.ABOUT,
    SectionNames.ACADEMIC,
    SectionNames.HONORS,
    SectionNames.CERTIFICATIONS,
    SectionNames.SKILLS,
    SectionNames.EXPERIENCE,
    SectionNames.PROJECTS,
    SectionNames.SOFT_SKILLS,
    SectionNames.LANGUAGES,
    SectionNames.CONTACT,
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
      logError(ErrorMessages.LOAD_PROFILE_FAILED, error, "MainPageController");
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
      { 
        id: NavIds.ABOUT, 
        label: NavLabels.ABOUT, 
        href: SectionHrefs.ABOUT 
      },
      {
        id: NavIds.EDUCATION,
        label: NavLabels.EDUCATION,
        href: SectionHrefs.EDUCATION,
        children: [
          { 
            id: NavIds.ACADEMIC, 
            label: NavLabels.ACADEMIC, 
            href: SectionHrefs.ACADEMIC 
          },
          { 
            id: NavIds.HONORS, 
            label: NavLabels.HONORS, 
            href: SectionHrefs.HONORS 
          },
          { 
            id: NavIds.CERTIFICATIONS, 
            label: NavLabels.CERTIFICATIONS, 
            href: SectionHrefs.CERTIFICATIONS 
          },
        ],
      } as NavbarDropdownItem,
      {
        id: NavIds.SKILLS,
        label: NavLabels.SKILLS,
        href: SectionHrefs.SKILLS,
        children: [
          { 
            id: NavIds.TECHNICAL_SKILLS, 
            label: NavLabels.TECHNICAL_SKILLS, 
            href: SectionHrefs.TECHNICAL_SKILLS 
          },
          { 
            id: NavIds.SOFT_SKILLS, 
            label: NavLabels.SOFT_SKILLS, 
            href: SectionHrefs.SOFT_SKILLS 
          },
          { 
            id: NavIds.LANGUAGES, 
            label: NavLabels.LANGUAGES, 
            href: SectionHrefs.LANGUAGES 
          },
        ],
      } as NavbarDropdownItem,
      { 
        id: NavIds.EXPERIENCE, 
        label: NavLabels.EXPERIENCE, 
        href: SectionHrefs.EXPERIENCE 
      },
      { 
        id: NavIds.PROJECTS, 
        label: NavLabels.PROJECTS, 
        href: SectionHrefs.PROJECTS 
      },
      { 
        id: NavIds.CONTACT, 
        label: NavLabels.CONTACT, 
        href: SectionHrefs.CONTACT 
      },
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

