/**
 * Domain Types - Core business entities
 * Single source of truth for all domain models
 */

export interface Academic {
  readonly id: string;
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly description?: string;
}

export interface Certification {
  readonly id: string;
  readonly name: string;
  readonly issuer: string;
  readonly issueDate: string;
  readonly expiryDate?: string;
  readonly credentialId?: string;
  readonly credentialUrl?: string;
}

export interface Contact {
  readonly id: string;
  readonly type:
    | "email"
    | "phone"
    | "linkedin"
    | "github"
    | "website"
    | "other";
  readonly value: string;
  readonly label: string;
  readonly isPrimary: boolean;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly isCurrent: boolean;
  readonly description: string;
  readonly achievements: readonly string[];
  readonly technologies: readonly string[];
  readonly skillIds?: readonly string[]; // References to technical skill names
}

export interface Honor {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly description?: string;
  readonly url?: string;
}

export interface Language {
  readonly id: string;
  readonly name: string;
  readonly proficiency:
    | "native"
    | "fluent"
    | "professional"
    | "conversational"
    | "basic";
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly technologies: readonly string[];
  readonly category:
    | "web"
    | "mobile"
    | "ai"
    | "backend"
    | "fullstack"
    | "other";
  readonly startDate: string;
  readonly endDate?: string;
  readonly isActive: boolean;
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly imageUrl?: string;
  readonly achievements: readonly string[];
  readonly architecture?: string;
}

export interface SoftSkill {
  readonly id: string;
  readonly name: string;
  readonly category:
    | "leadership"
    | "communication"
    | "problem-solving"
    | "collaboration"
    | "adaptability"
    | "other";
}

export interface Stat {
  readonly id: string;
  readonly label: string;
  readonly value: string | number;
  readonly unit?: string;
  readonly description?: string;
}

export interface TechnicalSkill {
  readonly id: string;
  readonly name: string;
  readonly category:
    | "language"
    | "framework"
    | "database"
    | "tool"
    | "cloud"
    | "other";
  readonly proficiency: "expert" | "advanced" | "intermediate" | "beginner";
  readonly yearsOfExperience?: number;
}

export interface Testimonial {
  readonly id: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly content: string;
  readonly date: string;
  readonly avatarUrl?: string;
}

export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly bio: string;
  readonly academics: readonly Academic[];
  readonly certifications: readonly Certification[];
  readonly contacts: readonly Contact[];
  readonly experiences: readonly Experience[];
  readonly honors: readonly Honor[];
  readonly languages: readonly Language[];
  readonly projects: readonly Project[];
  readonly softSkills: readonly SoftSkill[];
  readonly stats: readonly Stat[];
  readonly technicalSkills: readonly TechnicalSkill[];
  readonly testimonials: readonly Testimonial[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
