import type { Project } from "@/types/domain";

/**
 * Neutral site copy when profile data is missing or for static HTML fallbacks.
 * Keeps UI/SEO free of placeholder personal names.
 */

export const SITE_BRAND_NAME = "Portfolio";
export const SITE_SEO_TITLE_SUFFIX = "Portfolio";
export const SITE_DEFAULT_TAGLINE = "Professional profile";
export const SITE_DEFAULT_DESCRIPTION =
  "Professional portfolio: projects, experience, and contact.";
export const SITE_DEFAULT_KEYWORDS =
  "portfolio, developer, projects, experience, contact";

export const CONTACT_SEO_DESCRIPTION =
  "Get in touch: contact form and professional links.";

export const sitePageTitle = (page: string): string =>
  `${page} | ${SITE_SEO_TITLE_SUFFIX}`;

/** Australian work rights — shown where recruiters look (contact, résumé, footer) */
export const WORK_RIGHTS = {
  short: "Full work rights from Jul 2027 · no sponsorship needed",
  detail:
    "Student visa with work rights until July 2027, then moving to a Temporary Graduate visa (subclass 485) — full work rights, no sponsorship needed.",
};

/** Display names for project categories (raw values are lowercase slugs) */
export const PROJECT_CATEGORY_LABEL: Record<Project["category"], string> = {
  ai: "AI",
  fullstack: "Full-stack",
  web: "Web",
  backend: "Backend",
  mobile: "Mobile",
  other: "Other",
};
