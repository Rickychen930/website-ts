/**
 * SoftSkillsModel - Model Layer (MVC Pattern)
 * 
 * Responsibilities:
 * - Data structure definitions
 * - Type safety and validation
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Interface Segregation Principle (ISP)
 */

/**
 * Soft Skill Item Interface
 * Represents a single soft skill with all its properties
 */
export interface SoftSkillItem {
  readonly key: string;
  readonly icon: string;
  readonly name: string;
  readonly description: string;
}

/**
 * Soft Skills Data Validation Result
 */
export interface ISoftSkillsValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
  readonly validItems: readonly SoftSkillItem[];
}

/**
 * Soft Skills Model Class
 * Handles data validation and transformation
 */
export class SoftSkillsModel {
  /**
   * Validate a single soft skill item
   * @param item - Item to validate
   * @returns True if valid
   */
  static validateItem(item: unknown): item is SoftSkillItem {
    if (!item || typeof item !== "object") {
      return false;
    }

    const skill = item as Partial<SoftSkillItem>;

    return (
      typeof skill.key === "string" &&
      skill.key.trim() !== "" &&
      typeof skill.name === "string" &&
      skill.name.trim() !== "" &&
      (typeof skill.icon === "string" || skill.icon === undefined) &&
      (typeof skill.description === "string" || skill.description === undefined)
    );
  }

  /**
   * Validate array of soft skills
   * @param data - Data to validate
   * @returns Validation result
   */
  static validateData(data: unknown): ISoftSkillsValidationResult {
    const errors: string[] = [];
    const validItems: SoftSkillItem[] = [];

    if (!Array.isArray(data)) {
      return {
        isValid: false,
        errors: ["Data must be an array"],
        validItems: [],
      };
    }

    if (data.length === 0) {
      return {
        isValid: false,
        errors: ["Array is empty"],
        validItems: [],
      };
    }

    data.forEach((item, index) => {
      if (this.validateItem(item)) {
        validItems.push(item);
      } else {
        errors.push(`Item at index ${index} is invalid`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      validItems,
    };
  }

  /**
   * Create a SoftSkillItem from unknown data
   * @param data - Raw data
   * @returns SoftSkillItem or null
   */
  static createFromData(data: unknown): SoftSkillItem | null {
    if (!this.validateItem(data)) {
      return null;
    }

    return {
      key: String(data.key).trim(),
      name: String(data.name).trim(),
      icon: String(data.icon || "").trim(),
      description: String(data.description || "").trim(),
    };
  }
}

