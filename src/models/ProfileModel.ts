/**
 * Profile Model - Domain Model
 * Immutable, type-safe representation of profile data
 */

import type {
  Profile,
  Academic,
  Certification,
  Contact,
  Experience,
  Honor,
  Language,
  LearningSection,
  Project,
  SoftSkill,
  Stat,
  TechnicalSkill,
  Testimonial,
} from "@/types/domain";

export class ProfileModel implements Profile {
  public readonly id: string;
  public readonly name: string;
  public readonly title: string;
  public readonly location: string;
  public readonly bio: string;
  public readonly academics: readonly Academic[];
  public readonly certifications: readonly Certification[];
  public readonly contacts: readonly Contact[];
  public readonly experiences: readonly Experience[];
  public readonly honors: readonly Honor[];
  public readonly languages: readonly Language[];
  public readonly learningSections: readonly LearningSection[];
  public readonly projects: readonly Project[];
  public readonly softSkills: readonly SoftSkill[];
  public readonly stats: readonly Stat[];
  public readonly technicalSkills: readonly TechnicalSkill[];
  public readonly testimonials: readonly Testimonial[];
  public readonly createdAt: string;
  public readonly updatedAt: string;

  private constructor(data: Profile) {
    this.id = data.id;
    this.name = data.name;
    this.title = data.title;
    this.location = data.location;
    this.bio = data.bio;
    this.academics = Object.freeze([...data.academics]);
    this.certifications = Object.freeze([...data.certifications]);
    this.contacts = Object.freeze([...data.contacts]);
    this.experiences = Object.freeze([...data.experiences]);
    this.honors = Object.freeze([...data.honors]);
    this.languages = Object.freeze([...data.languages]);
    this.learningSections = Object.freeze(
      [...(data.learningSections ?? [])].sort((a, b) => a.order - b.order),
    );
    this.projects = Object.freeze([...data.projects]);
    this.softSkills = Object.freeze([...data.softSkills]);
    this.stats = Object.freeze([...data.stats]);
    this.technicalSkills = Object.freeze([...data.technicalSkills]);
    this.testimonials = Object.freeze([...data.testimonials]);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: Profile): ProfileModel {
    return new ProfileModel(data);
  }

  public getPrimaryContact(): Contact | undefined {
    return this.contacts.find((contact) => contact.isPrimary);
  }

  public getCurrentExperience(): Experience | undefined {
    return this.experiences.find((exp) => exp.isCurrent);
  }

  public getFeaturedProjects(count: number = 3): readonly Project[] {
    return this.projects
      .filter((project) => project.isActive || !project.endDate)
      .slice(0, count);
  }

  public getSkillsByCategory(
    category: TechnicalSkill["category"],
  ): readonly TechnicalSkill[] {
    return this.technicalSkills.filter((skill) => skill.category === category);
  }

  public getProjectsByCategory(
    category: Project["category"],
  ): readonly Project[] {
    return this.projects.filter((project) => project.category === category);
  }

  /** Learning sections that are published, ordered by order field */
  public getPublishedLearningSections(): readonly LearningSection[] {
    return this.learningSections.filter((s) => s.published);
  }
}
