/**
 * SoftSkillsController - Controller Layer (MVC Pattern)
 * 
 * Responsibilities:
 * - Business logic for soft skills section
 * - Data validation and transformation
 * - State management coordination
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Dependency Inversion Principle (DIP)
 * - Open/Closed Principle (OCP)
 * - DRY: Extends BaseController for common functionality
 * - OOP: Extends BaseController
 */
import { SoftSkillItem } from "../models/soft-skills-model";
import { UserProfile } from "../types/user";
import { BaseController } from "./base-controller";

export interface ISoftSkillsController {
  validateData(data: unknown): data is SoftSkillItem[];
  transformData(data: unknown): SoftSkillItem[];
  getValidatedSkills(data: unknown): SoftSkillItem[];
  groupSkillsByCategory(skills: SoftSkillItem[]): Map<string, SoftSkillItem[]>;
}

export class SoftSkillsController extends BaseController implements ISoftSkillsController {
  /**
   * Get soft skills data from profile
   * @param profile - User profile
   * @returns Soft skills array or null
   */
  getSoftSkillsData(profile: UserProfile): SoftSkillItem[] | null {
    if (!profile || !profile.softSkills) {
      return null;
    }

    const data = this.getValidatedSkills(profile.softSkills);
    return data.length > 0 ? data : null;
  }

  /**
   * Implementation of abstract method from BaseController
   * @param profile - User profile
   * @returns Extracted data or null
   */
  protected getData(profile: UserProfile): unknown | null {
    return this.getSoftSkillsData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return this.validateData(data);
  }

  /**
   * Validate if data is a valid array of soft skills
   * @param data - Data to validate
   * @returns True if valid
   */
  validateData(data: unknown): data is SoftSkillItem[] {
    if (!Array.isArray(data)) {
      return false;
    }

    return data.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        typeof item.key === "string" &&
        item.key.trim() !== "" &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        (typeof item.icon === "string" || item.icon === undefined) &&
        (typeof item.description === "string" || item.description === undefined)
      );
    });
  }

  /**
   * Transform unknown data to SoftSkillItem array
   * @param data - Data to transform
   * @returns Array of SoftSkillItem
   */
  transformData(data: unknown): SoftSkillItem[] {
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter((item) => {
        return (
          item &&
          typeof item === "object" &&
          typeof item.key === "string" &&
          typeof item.name === "string"
        );
      })
      .map((item) => ({
        key: String(item.key || ""),
        name: String(item.name || ""),
        icon: String(item.icon || ""),
        description: String(item.description || ""),
      }))
      .filter((item) => item.key.trim() !== "" && item.name.trim() !== "");
  }

  /**
   * Get validated and filtered soft skills
   * @param data - Raw data
   * @returns Validated array of soft skills
   */
  getValidatedSkills(data: unknown): SoftSkillItem[] {
    if (this.validateData(data)) {
      return data.filter(
        (item) => item.key.trim() !== "" && item.name.trim() !== ""
      );
    }

    return this.transformData(data);
  }

  /**
   * Group skills by category (optional enhancement)
   * @param skills - Array of soft skills
   * @returns Map of category to skills
   */
  groupSkillsByCategory(
    skills: SoftSkillItem[]
  ): Map<string, SoftSkillItem[]> {
    const grouped = new Map<string, SoftSkillItem[]>();

    skills.forEach((skill) => {
      // For now, all skills are in "general" category
      // Can be extended to support categories in the future
      const category = "general";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(skill);
    });

    return grouped;
  }
}

