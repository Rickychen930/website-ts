/**
 * Transform Profile - Ensures backend data matches frontend Profile interface
 * Adds id fields to nested objects and converts dates to strings
 */

import type { IProfile } from "../models/Profile";

export const transformProfile = (profile: IProfile): any => {
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

  const transformed: any = {
    id: (profile._id as any)?.toString() || String(profile._id || ""),
    name: profile.name || "",
    title: profile.title || "",
    location: profile.location || "",
    bio: profile.bio || "",
    academics: academics.map((academic, index) => ({
      id: (academic as any)?._id?.toString() || `academic-${index}`,
      institution: academic.institution || "",
      degree: academic.degree || "",
      field: academic.field || "",
      startDate: academic.startDate || "",
      endDate: academic.endDate,
      description: academic.description,
    })),
    certifications: certifications.map((cert, index) => ({
      id: (cert as any)?._id?.toString() || `cert-${index}`,
      name: cert.name || "",
      issuer: cert.issuer || "",
      issueDate: cert.issueDate || "",
      expiryDate: cert.expiryDate,
      credentialId: cert.credentialId,
      credentialUrl: cert.credentialUrl,
    })),
    contacts: contacts.map((contact, index) => ({
      id: (contact as any)?._id?.toString() || `contact-${index}`,
      type: contact.type || "other",
      value: contact.value || "",
      label: contact.label || "",
      isPrimary: contact.isPrimary || false,
    })),
    experiences: experiences.map((exp, index) => ({
      id: (exp as any)?._id?.toString() || `exp-${index}`,
      company: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate,
      isCurrent: exp.isCurrent || false,
      description: exp.description || "",
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
    })),
    honors: honors.map((honor, index) => ({
      id: (honor as any)?._id?.toString() || `honor-${index}`,
      title: honor.title || "",
      issuer: honor.issuer || "",
      date: honor.date || "",
      description: honor.description,
      url: honor.url,
    })),
    languages: languages.map((lang, index) => ({
      id: (lang as any)?._id?.toString() || `lang-${index}`,
      name: lang.name || "",
      proficiency: lang.proficiency || "basic",
    })),
    projects: projects.map((project, index) => ({
      id: (project as any)?._id?.toString() || `project-${index}`,
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
      id: (skill as any)?._id?.toString() || `softskill-${index}`,
      name: skill.name || "",
      category: skill.category || "other",
    })),
    stats: stats.map((stat, index) => ({
      id: (stat as any)?._id?.toString() || `stat-${index}`,
      label: stat.label || "",
      value: stat.value ?? "",
      unit: stat.unit,
      description: stat.description,
    })),
    technicalSkills: technicalSkills.map((skill, index) => ({
      id: (skill as any)?._id?.toString() || `skill-${index}`,
      name: skill.name || "",
      category: skill.category || "other",
      proficiency: skill.proficiency || "beginner",
      yearsOfExperience: skill.yearsOfExperience,
    })),
    testimonials: testimonials.map((testimonial, index) => ({
      id: (testimonial as any)?._id?.toString() || `testimonial-${index}`,
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
