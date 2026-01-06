/**
 * Footer Controller
 * Controller Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles footer business logic
 * - Dependency Inversion Principle (DIP): Depends on abstractions (Model)
 * - Open/Closed Principle (OCP): Extensible without modification
 * - DRY: Centralized business logic
 */

import {
  IFooterData,
  FooterModel,
  IFooterLink,
  IFooterSocialLink,
  IFooterTechBadge,
  IFooterStat,
} from "../models/footer-model";
import { UserProfile } from "../types/user";
import { logWarn, logError } from "../utils/logger";

/**
 * Footer Controller
 * Orchestrates footer-related business logic
 */
export class FooterController {
  private readonly model: typeof FooterModel;

  constructor(model: typeof FooterModel = FooterModel) {
    this.model = model;
  }

  /**
   * Get footer data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getFooterData(profile: UserProfile): IFooterData | null {
    if (!this.model.shouldDisplay(profile)) {
      return null;
    }

    const data = this.model.extractFromProfile(profile);
    const validation = this.model.validate(data);

    if (!validation.isValid) {
      logWarn("Footer data validation failed", { errors: validation.errors }, "FooterController");
      return null;
    }

    return data;
  }

  /**
   * Get quick links for navigation
   */
  getQuickLinks(data: IFooterData): IFooterLink[] {
    return data.quickLinks || [];
  }

  /**
   * Get social media links
   */
  getSocialLinks(data: IFooterData): IFooterSocialLink[] {
    return data.socialLinks || [];
  }

  /**
   * Get tech stack badges
   */
  getTechStack(data: IFooterData): IFooterTechBadge[] {
    return data.techStack || [];
  }

  /**
   * Get contact information
   */
  getContactInfo(data: IFooterData) {
    return data.contactInfo || [];
  }

  /**
   * Get statistics
   */
  getStats(data: IFooterData): IFooterStat[] {
    return data.stats || [];
  }

  /**
   * Handle link click
   */
  handleLinkClick(link: IFooterLink | IFooterSocialLink): void {
    if (!link.href || link.href === "#") {
      return;
    }

    try {
      // Check if it's a social link (always external) or has external flag
      const isExternal = "external" in link ? link.external : true;
      const isSocialLink = "platform" in link;

      // Internal links - smooth scroll
      if (link.href.startsWith("#") && !isExternal && !isSocialLink) {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return;
        }
      }

      // External links - open in new tab
      if (isExternal || isSocialLink || link.href.startsWith("http")) {
        window.open(link.href, "_blank", "noopener,noreferrer");
        return;
      }

      // Default - navigate
      window.location.href = link.href;
    } catch (error) {
      logError("Failed to handle link click", error, "FooterController");
    }
  }

  /**
   * Get grouped tech stack by category
   */
  getGroupedTechStack(data: IFooterData): Map<string, IFooterTechBadge[]> {
    const grouped = new Map<string, IFooterTechBadge[]>();
    const techStack = this.getTechStack(data);

    techStack.forEach((tech) => {
      const category = tech.category || "Other";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(tech);
    });

    return grouped;
  }

  /**
   * Check if footer should be displayed
   */
  shouldDisplay(profile: UserProfile): boolean {
    return this.model.shouldDisplay(profile);
  }
}

