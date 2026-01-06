/**
 * Footer Model
 * Model Layer (MVC Pattern)
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles footer data structure and validation
 * - Open/Closed Principle (OCP): Extensible via interfaces
 * - Interface Segregation Principle (ISP): Focused interfaces
 * - DRY: Centralized data operations
 */

import { UserProfile } from "../types/user";
import { IContact, ContactType } from "./contact-model";
import { SocialColors } from "../constants/colors";

/**
 * Footer Link Interface
 * Represents a navigation link in the footer
 */
export interface IFooterLink {
  key: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

/**
 * Footer Social Media Link Interface
 */
export interface IFooterSocialLink {
  key: string;
  label: string;
  href: string;
  icon: string;
  platform: string;
  color?: string;
}

/**
 * Footer Tech Stack Badge Interface
 */
export interface IFooterTechBadge {
  key: string;
  name: string;
  icon?: string;
  category: string;
}

/**
 * Footer Section Interface
 */
export interface IFooterSection {
  key: string;
  title: string;
  items: IFooterLink[];
}

/**
 * Footer Stat Interface
 */
export interface IFooterStat {
  key: string;
  value: string;
  label: string;
  icon?: string;
}

/**
 * Footer Data Interface
 * Complete footer data structure
 */
export interface IFooterData {
  quickLinks: IFooterLink[];
  socialLinks: IFooterSocialLink[];
  techStack: IFooterTechBadge[];
  contactInfo: IContact[];
  stats: IFooterStat[];
  copyright: string;
  author: string;
}

/**
 * Footer Model Class
 * Encapsulates footer data operations
 */
export class FooterModel {
  /**
   * Extract footer data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IFooterData {
    return {
      quickLinks: this.generateQuickLinks(),
      socialLinks: this.extractSocialLinks(profile),
      techStack: this.extractTechStack(profile),
      contactInfo: this.extractContactInfo(profile),
      stats: this.extractStats(profile),
      copyright: this.generateCopyright(profile),
      author: profile.name || "Software Engineer",
    };
  }

  /**
   * Extract statistics from profile
   */
  private static extractStats(profile: UserProfile): IFooterStat[] {
    const stats: IFooterStat[] = [];

    // Projects count
    if (profile.projects && profile.projects.length > 0) {
      stats.push({
        key: "projects",
        value: `${profile.projects.length}+`,
        label: "Projects",
        icon: "🚀",
      });
    }

    // Technical skills count
    if (profile.technicalSkills && profile.technicalSkills.length > 0) {
      const totalSkills = profile.technicalSkills.reduce(
        (sum, category) => sum + (category.items?.length || 0),
        0,
      );
      if (totalSkills > 0) {
        stats.push({
          key: "skills",
          value: `${totalSkills}+`,
          label: "Technologies",
          icon: "💻",
        });
      }
    }

    // Experience count
    if (profile.experiences && profile.experiences.length > 0) {
      stats.push({
        key: "experience",
        value: `${profile.experiences.length}+`,
        label: "Experiences",
        icon: "💼",
      });
    }

    // Certifications count
    if (profile.certifications && profile.certifications.length > 0) {
      stats.push({
        key: "certifications",
        value: `${profile.certifications.length}+`,
        label: "Certifications",
        icon: "🏆",
      });
    }

    return stats;
  }

  /**
   * Generate quick navigation links
   */
  private static generateQuickLinks(): IFooterLink[] {
    return [
      { key: "about", label: "About", href: "#about", icon: "👤" },
      { key: "skills", label: "Skills", href: "#skills", icon: "💻" },
      {
        key: "experience",
        label: "Experience",
        href: "#experience",
        icon: "💼",
      },
      { key: "projects", label: "Projects", href: "#projects", icon: "🚀" },
      { key: "contact", label: "Contact", href: "#contact", icon: "📧" },
    ];
  }

  /**
   * Extract social media links from profile
   */
  private static extractSocialLinks(profile: UserProfile): IFooterSocialLink[] {
    if (!profile.contacts || !Array.isArray(profile.contacts)) {
      return [];
    }

    const socialPlatforms: Record<string, { icon: string; color: string }> = {
      linkedin: { icon: "💼", color: SocialColors.LINKEDIN },
      github: { icon: "💻", color: SocialColors.GITHUB },
      twitter: { icon: "🐦", color: SocialColors.TWITTER },
      instagram: { icon: "📷", color: SocialColors.INSTAGRAM },
      facebook: { icon: "👥", color: SocialColors.FACEBOOK },
      email: { icon: "✉️", color: SocialColors.EMAIL },
    };

    return profile.contacts
      .filter((contact) => {
        const key = contact.key?.toLowerCase() || "";
        return (
          key.includes("linkedin") ||
          key.includes("github") ||
          key.includes("twitter") ||
          key.includes("instagram") ||
          key.includes("facebook") ||
          key.includes("email")
        );
      })
      .map((contact) => {
        const key = contact.key?.toLowerCase() || "";
        const platform = this.detectPlatform(key);
        const platformData = socialPlatforms[platform] || {
          icon: "🔗",
          color: SocialColors.DEFAULT,
        };

        return {
          key: contact.key || `social-${platform}`,
          label: contact.label || platform,
          href: contact.link || contact.value || "#",
          icon: contact.icon || platformData.icon,
          platform,
          color: platformData.color,
        };
      });
  }

  /**
   * Detect social media platform from key
   */
  private static detectPlatform(key: string): string {
    if (key.includes("linkedin")) return "linkedin";
    if (key.includes("github")) return "github";
    if (key.includes("twitter")) return "twitter";
    if (key.includes("instagram")) return "instagram";
    if (key.includes("facebook")) return "facebook";
    if (key.includes("email")) return "email";
    return "other";
  }

  /**
   * Extract tech stack from profile
   */
  private static extractTechStack(profile: UserProfile): IFooterTechBadge[] {
    const techStack: IFooterTechBadge[] = [];

    // Extract from technical skills
    if (profile.technicalSkills && Array.isArray(profile.technicalSkills)) {
      profile.technicalSkills.forEach((category) => {
        if (category.items && Array.isArray(category.items)) {
          category.items.slice(0, 8).forEach((item) => {
            techStack.push({
              key: `tech-${item.toLowerCase().replace(/\s+/g, "-")}`,
              name: item,
              category: category.category || "Other",
            });
          });
        }
      });
    }

    // Limit to top 12 technologies
    return techStack.slice(0, 12);
  }

  /**
   * Extract contact information from profile
   */
  private static extractContactInfo(profile: UserProfile): IContact[] {
    if (!profile.contacts || !Array.isArray(profile.contacts)) {
      return [];
    }

    return profile.contacts.map((item) => ({
      key: item.key || `contact-${Math.random().toString(36).substr(2, 9)}`,
      icon: item.icon || "📧",
      label: item.label || "",
      value: item.value || "",
      link: item.link,
      type: this.detectContactType(item.label, item.value, item.link),
    }));
  }

  /**
   * Detect contact type
   */
  private static detectContactType(
    label: string,
    value: string,
    link?: string,
  ): ContactType {
    const lowerLabel = label.toLowerCase();
    const lowerValue = value.toLowerCase();

    if (lowerLabel.includes("email") || lowerValue.includes("@")) {
      return ContactType.EMAIL;
    }

    if (
      lowerLabel.includes("phone") ||
      lowerLabel.includes("mobile") ||
      /^[\d\s\-+()]+$/.test(value)
    ) {
      return ContactType.PHONE;
    }

    if (
      lowerLabel.includes("linkedin") ||
      lowerLabel.includes("github") ||
      lowerLabel.includes("twitter") ||
      lowerLabel.includes("instagram") ||
      lowerLabel.includes("facebook")
    ) {
      return ContactType.SOCIAL;
    }

    if (lowerLabel.includes("location") || lowerLabel.includes("address")) {
      return ContactType.LOCATION;
    }

    if (lowerLabel.includes("website") || lowerLabel.includes("portfolio")) {
      return ContactType.WEBSITE;
    }

    return ContactType.OTHER;
  }

  /**
   * Generate copyright text
   */
  private static generateCopyright(profile: UserProfile): string {
    const year = new Date().getFullYear();
    const name = profile.name || "Software Engineer";
    return `© ${year} ${name}. All rights reserved.`;
  }

  /**
   * Validate footer data
   */
  public static validate(data: IFooterData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!data) {
      return { isValid: false, errors: ["Footer data is required"] };
    }

    if (!data.author || typeof data.author !== "string") {
      errors.push("Author name is required");
    }

    if (!data.copyright || typeof data.copyright !== "string") {
      errors.push("Copyright text is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if footer should be displayed
   */
  public static shouldDisplay(profile: UserProfile): boolean {
    return !!profile && !!profile.name;
  }
}
