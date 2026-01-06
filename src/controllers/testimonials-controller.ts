/**
 * TestimonialsController - Controller Layer (MVC Pattern)
 * Handles testimonials/recommendations data processing
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 * Extends BaseController for common functionality (DRY, OOP)
 */

import { BaseController } from "./base-controller";
import { UserProfile } from "../types/user";

export interface ITestimonial {
  key: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  text: string;
  rating?: number; // 1-5 stars
  date?: string;
  link?: string; // LinkedIn or other profile link
}

/**
 * TestimonialsController
 * Orchestrates business logic for Testimonials section
 * Follows OOP principles - extends BaseController
 */
export class TestimonialsController extends BaseController {
  /**
   * Get default/mock testimonials
   * In production, this would come from database or API
   */
  getDefaultTestimonials(): ITestimonial[] {
    return [
      {
        key: "testimonial-1",
        name: "John Doe",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        text: "Ricky is an exceptional developer with strong problem-solving skills and attention to detail. His code quality and technical expertise are outstanding.",
        rating: 5,
        date: "2024",
      },
      {
        key: "testimonial-2",
        name: "Jane Smith",
        role: "Product Manager",
        company: "Innovation Labs",
        text: "Working with Ricky was a pleasure. He consistently delivers high-quality work and is always willing to go the extra mile.",
        rating: 5,
        date: "2024",
      },
      {
        key: "testimonial-3",
        name: "Mike Johnson",
        role: "CTO",
        company: "StartupXYZ",
        text: "Ricky's technical skills and professionalism make him a valuable team member. Highly recommended!",
        rating: 5,
        date: "2023",
      },
    ];
  }

  /**
   * Validate testimonial data
   */
  validateTestimonial(testimonial: Partial<ITestimonial>): boolean {
    return !!(
      testimonial.key &&
      testimonial.name &&
      testimonial.role &&
      testimonial.company &&
      testimonial.text &&
      testimonial.text.length >= 20
    );
  }

  /**
   * Get testimonials (with fallback to defaults)
   * Follows Single Responsibility Principle (SRP)
   */
  getTestimonials(customTestimonials?: ITestimonial[]): ITestimonial[] {
    if (customTestimonials && customTestimonials.length > 0) {
      return customTestimonials.filter((t) => this.validateTestimonial(t));
    }
    return this.getDefaultTestimonials();
  }

  /**
   * Implementation of abstract method from BaseController
   * @param profile - User profile
   * @returns Extracted data or null
   */
  protected getData(profile: UserProfile): unknown | null {
    // Testimonials are currently mock data, not from profile
    // In future, this could extract from profile.testimonials if added
    return this.getDefaultTestimonials();
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    if (!Array.isArray(data)) return false;
    return data.every((item) => this.validateTestimonial(item as ITestimonial));
  }
}
