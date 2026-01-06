/**
 * String Constants
 * Centralized string definitions for labels, messages, and UI text
 *
 * Usage:
 * import { Strings } from '@/constants';
 * <h1>{Strings.SECTIONS.ABOUT}</h1>
 */

/**
 * Section Names
 */
export const SectionNames = {
  ABOUT: "About",
  ACADEMIC: "Academic",
  HONORS: "Honors",
  CERTIFICATIONS: "Certifications",
  SKILLS: "Skills",
  TECHNICAL_SKILLS: "Technical Skills",
  SOFT_SKILLS: "Soft Skills",
  LANGUAGES: "Languages",
  EXPERIENCE: "Experience",
  WORK_EXPERIENCE: "Work Experience",
  PROJECTS: "Projects",
  CONTACT: "Contact",
  EDUCATION: "Education",
  TESTIMONIALS: "Testimonials",
} as const;

/**
 * Navigation Labels
 */
export const NavLabels = {
  ABOUT: "About",
  EDUCATION: "Education",
  ACADEMIC: "Academic",
  HONORS: "Honors",
  CERTIFICATIONS: "Certifications",
  SKILLS: "Skills",
  TECHNICAL_SKILLS: "Technical Skills",
  SOFT_SKILLS: "Soft Skills",
  LANGUAGES: "Languages",
  EXPERIENCE: "Experience",
  PROJECTS: "Projects",
  CONTACT: "Contact",
} as const;

/**
 * Navigation IDs
 */
export const NavIds = {
  ABOUT: "nav-item-about",
  EDUCATION: "nav-item-education",
  ACADEMIC: "nav-item-academic",
  HONORS: "nav-item-honors",
  CERTIFICATIONS: "nav-item-certifications",
  SKILLS: "nav-item-skills",
  TECHNICAL_SKILLS: "nav-item-technical-skills",
  SOFT_SKILLS: "nav-item-soft-skills",
  LANGUAGES: "nav-item-languages",
  EXPERIENCE: "nav-item-experience",
  PROJECTS: "nav-item-projects",
  CONTACT: "nav-item-contact",
} as const;

/**
 * Section IDs (for anchors)
 */
export const SectionIds = {
  ABOUT: "about",
  ACADEMIC: "academic",
  HONORS: "honors",
  CERTIFICATIONS: "certifications",
  SKILLS: "skills",
  TECHNICAL_SKILLS: "skills",
  SOFT_SKILLS: "soft-skills",
  LANGUAGES: "languages",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  CONTACT: "contact",
  EDUCATION: "education",
} as const;

/**
 * Section Hrefs (for navigation)
 */
export const SectionHrefs = {
  ABOUT: "#about",
  ACADEMIC: "#academic",
  HONORS: "#honors",
  CERTIFICATIONS: "#certifications",
  SKILLS: "#skills",
  TECHNICAL_SKILLS: "#skills",
  SOFT_SKILLS: "#soft-skills",
  LANGUAGES: "#languages",
  EXPERIENCE: "#experience",
  PROJECTS: "#projects",
  CONTACT: "#contact",
  EDUCATION: "#education",
} as const;

/**
 * Messages
 */
export const Messages = {
  LOADING: "Loading...",
  ERROR: "An error occurred",
  NO_DATA: "No data available",
  RETRY: "Retry",
  CLOSE: "Close",
  SUBMIT: "Submit",
  SEND: "Send",
  CANCEL: "Cancel",
  SAVE: "Save",
  EDIT: "Edit",
  DELETE: "Delete",
  SEARCH: "Search",
  CLEAR: "Clear",
  FILTER: "Filter",
  RESET: "Reset",
  BACK: "Back",
  NEXT: "Next",
  PREVIOUS: "Previous",
  MORE: "More",
  LESS: "Less",
  SHOW_MORE: "Show More",
  SHOW_LESS: "Show Less",
} as const;

/**
 * Error Messages
 */
export const ErrorMessages = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK:
    "Unable to connect. Please check your internet connection and try again.",
  NOT_FOUND: "The page or resource you're looking for doesn't exist.",
  UNAUTHORIZED: "You don't have permission to access this resource.",
  FORBIDDEN:
    "Access forbidden. Please contact support if you believe this is an error.",
  SERVER_ERROR:
    "Our servers are experiencing issues. Please try again in a few moments.",
  TIMEOUT:
    "The request took too long. Please check your connection and try again.",
  INVALID_INPUT:
    "Please check your input and make sure all fields are filled correctly.",
  LOAD_PROFILE_FAILED:
    "Unable to load profile information. Please refresh the page or try again later.",
  LOAD_DATA_FAILED:
    "Unable to load data. Please refresh the page or try again later.",
  CONTACT_FORM_FAILED:
    "Unable to send your message. Please check your connection and try again.",
  FORM_INVALID: "Please fill in all required fields correctly.",
} as const;

/**
 * Success Messages
 */
export const SuccessMessages = {
  SAVED: "Saved successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",
  SENT: "Sent successfully",
  COPIED: "Copied to clipboard",
  UPLOADED: "Uploaded successfully",
} as const;

/**
 * Placeholder Text
 */
export const Placeholders = {
  SEARCH: "Search...",
  NAME: "Name",
  EMAIL: "Email",
  MESSAGE: "Message",
  SUBJECT: "Subject",
  PHONE: "Phone",
  COMPANY: "Company",
  POSITION: "Position",
  DESCRIPTION: "Description",
} as const;

/**
 * ARIA Labels
 */
export const AriaLabels = {
  NAVIGATION: "Main navigation",
  MENU: "Menu",
  CLOSE_MENU: "Close menu",
  OPEN_MENU: "Open menu",
  SEARCH: "Search",
  CLOSE_SEARCH: "Close search",
  BACK_TO_TOP: "Back to top",
  LOADING: "Loading",
  ERROR: "Error",
  SUCCESS: "Success",
  PROJECTS_LIST: "Projects",
  CERTIFICATIONS_LIST: "Certifications",
  ACADEMIC_LIST: "Academic achievements",
  CONTACT_LIST: "Contact information",
} as const;

/**
 * Footer Labels
 */
export const FooterLabels = {
  QUICK_LINKS: "Quick Links",
  SECTIONS: "Sections",
  SOCIAL_MEDIA: "Social Media",
  COPYRIGHT: "© 2024 All rights reserved",
  BUILT_WITH: "Built with",
} as const;

/**
 * Action Labels
 */
export const ActionLabels = {
  DOWNLOAD_CV: "Download CV",
  HIRE_ME: "Hire Me",
  VIEW_PROJECT: "View Project",
  VIEW_CODE: "View Code",
  LEARN_MORE: "Learn More",
  CONTACT_ME: "Contact Me",
} as const;

/**
 * Section Titles
 */
export const SectionTitles = {
  FEATURED_TECHNOLOGIES: "Featured Technologies",
  KEY_ACHIEVEMENTS: "Key Achievements",
  KEY_ACHIEVEMENTS_LABEL: "Key Achievements:",
  TECHNICAL_SKILLS: "Technical Skills",
  WORK_EXPERIENCE: "Work Experience",
  PROJECTS: "Projects",
  EDUCATION: "Education",
  TESTIMONIALS: "Testimonials & Recommendations",
} as const;

/**
 * SEO Labels
 */
export const SEOLabels = {
  PORTFOLIO: "Portfolio",
  SOFTWARE_ENGINEER: "Software Engineer",
  DEVELOPER: "Developer",
  PROFESSIONAL_PORTFOLIO: "Professional portfolio",
  SHOWCASING:
    "showcasing software engineering skills, projects, and experience.",
} as const;

/**
 * Language Proficiency Levels
 */
export const LanguageProficiency = {
  NATIVE: "Native",
  PROFESSIONAL: "Professional Working Proficiency",
  FLUENT: "Fluent",
  INTERMEDIATE: "Intermediate",
  BASIC: "Basic",
} as const;

/**
 * Combined Strings Object
 */
export const Strings = {
  SECTIONS: SectionNames,
  NAV: NavLabels,
  NAV_IDS: NavIds,
  SECTION_IDS: SectionIds,
  SECTION_HREFS: SectionHrefs,
  MESSAGES: Messages,
  ERRORS: ErrorMessages,
  SUCCESS: SuccessMessages,
  PLACEHOLDERS: Placeholders,
  ARIA: AriaLabels,
  FOOTER: FooterLabels,
  LANGUAGE_PROFICIENCY: LanguageProficiency,
  ACTIONS: ActionLabels,
  SECTION_TITLES: SectionTitles,
  SEO: SEOLabels,
} as const;

/**
 * String Enums for type safety
 */
export enum SectionEnum {
  ABOUT = "About",
  ACADEMIC = "Academic",
  HONORS = "Honors",
  CERTIFICATIONS = "Certifications",
  SKILLS = "Skills",
  TECHNICAL_SKILLS = "Technical Skills",
  SOFT_SKILLS = "Soft Skills",
  LANGUAGES = "Languages",
  EXPERIENCE = "Experience",
  PROJECTS = "Projects",
  CONTACT = "Contact",
}

export enum MessageEnum {
  LOADING = "Loading...",
  ERROR = "An error occurred",
  NO_DATA = "No data available",
  RETRY = "Retry",
  CLOSE = "Close",
  SUBMIT = "Submit",
}

/**
 * Type exports
 */
export type SectionName = (typeof SectionNames)[keyof typeof SectionNames];
export type NavLabel = (typeof NavLabels)[keyof typeof NavLabels];
export type Message = (typeof Messages)[keyof typeof Messages];
export type ErrorMessage = (typeof ErrorMessages)[keyof typeof ErrorMessages];
export type LanguageProficiencyLevel =
  (typeof LanguageProficiency)[keyof typeof LanguageProficiency];
