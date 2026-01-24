/**
 * Transform Profile - Ensures backend data matches frontend Profile interface
 * Adds id fields to nested objects and converts dates to strings
 */

import type { IProfile } from "../models/Profile";
import type { Profile } from "../types/domain";

// Helper type for Mongoose document with _id
type MongooseDoc = { _id?: { toString(): string } | string | number };

export const transformProfile = (profile: IProfile): Profile => {
  // Ensure arrays exist (handle undefined/null)
  const academics = Array.isArray(profile.academics) ? profile.academics : [];
  const certifications = Array.isArray(profile.certifications)
    ? profile.certifications
    : [];
  const contacts = Array.isArray(profile.contacts) ? profile.contacts : [];
  const experiences = Array.isArray(profile.experiences)
    ? profile.experiences
    : [];
  const honors = Array.isArray(profile.honors) ? profile.honors : [];
  const languages = Array.isArray(profile.languages) ? profile.languages : [];
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const softSkills = Array.isArray(profile.softSkills)
    ? profile.softSkills
    : [];
  const stats = Array.isArray(profile.stats) ? profile.stats : [];
  const technicalSkills = Array.isArray(profile.technicalSkills)
    ? profile.technicalSkills
    : [];
  const testimonials = Array.isArray(profile.testimonials)
    ? profile.testimonials
    : [];

  // Convert dates safely
  const createdAt =
    profile.createdAt instanceof Date
      ? profile.createdAt.toISOString()
      : new Date(profile.createdAt || Date.now()).toISOString();
  const updatedAt =
    profile.updatedAt instanceof Date
      ? profile.updatedAt.toISOString()
      : new Date(profile.updatedAt || Date.now()).toISOString();

  // Helper function to extract ID from Mongoose document (defensive: never throw)
  const extractId = (doc: unknown, fallback: string): string => {
    try {
      if (!doc || typeof doc !== "object" || !("_id" in doc)) return fallback;
      const id = (doc as MongooseDoc)._id;
      if (id != null && typeof id === "object" && "toString" in id) {
        return (id as { toString(): string }).toString();
      }
      if (typeof id === "string" || typeof id === "number") {
        return String(id);
      }
    } catch {
      /* ignore */
    }
    return fallback;
  };

  const transformed: Profile = {
    id: extractId(profile, String(profile._id || "")),
    name: profile.name || "",
    title: profile.title || "",
    location: profile.location || "",
    bio: profile.bio || "",
    academics: academics.map((academic, index) => ({
      id: extractId(academic, `academic-${index}`),
      institution: academic.institution || "",
      degree: academic.degree || "",
      field: academic.field || "",
      startDate: academic.startDate || "",
      endDate: academic.endDate,
      description: academic.description,
    })),
    certifications: certifications.map((cert, index) => ({
      id: extractId(cert, `cert-${index}`),
      name: cert.name || "",
      issuer: cert.issuer || "",
      issueDate: cert.issueDate || "",
      expiryDate: cert.expiryDate,
      credentialId: cert.credentialId,
      credentialUrl: cert.credentialUrl,
    })),
    contacts: contacts.map((contact, index) => ({
      id: extractId(contact, `contact-${index}`),
      type: contact.type || "other",
      value: contact.value || "",
      label: contact.label || "",
      isPrimary: contact.isPrimary || false,
    })),
    experiences: experiences.map((exp, index) => ({
      id: extractId(exp, `exp-${index}`),
      company: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate,
      isCurrent: exp.isCurrent || false,
      description: exp.description || "",
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
      skillIds: Array.isArray(exp.skillIds) ? exp.skillIds : [],
    })),
    honors: honors.map((honor, index) => ({
      id: extractId(honor, `honor-${index}`),
      title: honor.title || "",
      issuer: honor.issuer || "",
      date: honor.date || "",
      description: honor.description,
      url: honor.url,
    })),
    languages: languages.map((lang, index) => ({
      id: extractId(lang, `lang-${index}`),
      name: lang.name || "",
      proficiency: lang.proficiency || "basic",
    })),
    projects: projects.map((project, index) => ({
      id: extractId(project, `project-${index}`),
      title: project.title || "",
      description: project.description || "",
      longDescription: project.longDescription,
      technologies: Array.isArray(project.technologies)
        ? project.technologies
        : [],
      category: project.category || "other",
      startDate: project.startDate || "",
      endDate: project.endDate,
      isActive: project.isActive || false,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      achievements: Array.isArray(project.achievements)
        ? project.achievements
        : [],
      architecture: project.architecture,
    })),
    softSkills: softSkills.map((skill, index) => ({
      id: extractId(skill, `softskill-${index}`),
      name: skill.name || "",
      category: skill.category || "other",
    })),
    stats: stats.map((stat, index) => ({
      id: extractId(stat, `stat-${index}`),
      label: stat.label || "",
      value: stat.value ?? "",
      unit: stat.unit,
      description: stat.description,
    })),
    technicalSkills: technicalSkills.map((skill, index) => ({
      id: extractId(skill, `skill-${index}`),
      name: skill.name || "",
      category: skill.category || "other",
      proficiency: skill.proficiency || "beginner",
      yearsOfExperience: skill.yearsOfExperience,
    })),
    testimonials: testimonials.map((testimonial, index) => ({
      id: extractId(testimonial, `testimonial-${index}`),
      author: testimonial.author || "",
      role: testimonial.role || "",
      company: testimonial.company || "",
      content: testimonial.content || "",
      date: testimonial.date || "",
      avatarUrl: testimonial.avatarUrl,
    })),
    createdAt,
    updatedAt,
  };

  return transformed;
};
