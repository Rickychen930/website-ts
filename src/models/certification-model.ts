/**
 * Certification Model
 * Model Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles certification data structure
 * - Open/Closed Principle (OCP): Extensible via interfaces
 * - Interface Segregation Principle (ISP): Focused interfaces
 */

/**
 * Certification Item Interface
 * Core data structure for a certification
 */
export interface ICertification {
  key: string;
  icon: string;
  title: string;
  provider: string;
  date: string;
  link?: string;
  credentialId?: string;
  description?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  skills?: string[];
}

/**
 * Certification Validation Result
 */
export interface ICertificationValidationResult {
  isValid: boolean;
  error: string | null;
  errors: string[];
}

/**
 * Certification Model Class
 * Encapsulates certification data operations
 */
export class CertificationModel {
  /**
   * Validate certification data
   * @param data - Certification data array
   * @returns Validation result
   */
  public static validate(data: ICertification[]): ICertificationValidationResult {
    const errors: string[] = [];

    if (!data || !Array.isArray(data)) {
      return {
        isValid: false,
        error: "Invalid certification data format",
        errors: ["Data must be an array"],
      };
    }

    if (data.length === 0) {
      return {
        isValid: true,
        error: null,
        errors: [],
      };
    }

    // Check for duplicate keys
    const keys = new Set<string>();
    data.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`Item at index ${index} is invalid`);
        return;
      }

      if (!item.key || typeof item.key !== "string" || item.key.trim() === "") {
        errors.push(`Item at index ${index} missing required key`);
        return;
      }

      if (keys.has(item.key)) {
        errors.push(`Duplicate certification key: ${item.key}`);
        return;
      }
      keys.add(item.key);

      if (!item.title || typeof item.title !== "string" || item.title.trim() === "") {
        errors.push(`Certification ${item.key} missing title`);
      }

      if (!item.provider || typeof item.provider !== "string" || item.provider.trim() === "") {
        errors.push(`Certification ${item.key} missing provider`);
      }

      if (!item.date || typeof item.date !== "string" || item.date.trim() === "") {
        errors.push(`Certification ${item.key} missing date`);
      }

      if (item.link && typeof item.link !== "string") {
        errors.push(`Certification ${item.key} has invalid link`);
      }
    });

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors[0] : null,
      errors,
    };
  }

  /**
   * Sort certifications by date (newest first)
   * @param certifications - Array of certifications
   * @returns Sorted array
   */
  public static sortByDate(certifications: ICertification[]): ICertification[] {
    return [...certifications].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
  }

  /**
   * Group certifications by provider
   * @param certifications - Array of certifications
   * @returns Grouped certifications
   */
  public static groupByProvider(certifications: ICertification[]): Map<string, ICertification[]> {
    const grouped = new Map<string, ICertification[]>();

    certifications.forEach((cert) => {
      const provider = cert.provider || "Unknown";
      if (!grouped.has(provider)) {
        grouped.set(provider, []);
      }
      grouped.get(provider)!.push(cert);
    });

    return grouped;
  }

  /**
   * Filter certifications by category
   * @param certifications - Array of certifications
   * @param category - Category to filter by
   * @returns Filtered certifications
   */
  public static filterByCategory(
    certifications: ICertification[],
    category: string
  ): ICertification[] {
    return certifications.filter((cert) => cert.category === category);
  }

  /**
   * Format date for display
   * @param dateString - Date string
   * @returns Formatted date
   */
  public static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Format date for datetime attribute
   * @param dateString - Date string
   * @returns ISO date string
   */
  public static formatDateForDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  }
}

