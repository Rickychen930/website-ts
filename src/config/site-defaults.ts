/**
 * Neutral site copy when profile data is missing or for static HTML fallbacks.
 * Keeps UI/SEO free of placeholder personal names.
 */

export const SITE_BRAND_NAME = "Portfolio";
export const SITE_SEO_TITLE_SUFFIX = "Portfolio";
export const SITE_DEFAULT_TAGLINE = "Professional profile";
export const SITE_DEFAULT_DESCRIPTION =
  "Professional portfolio: projects, experience, learning, and contact.";
export const SITE_DEFAULT_KEYWORDS =
  "portfolio, developer, projects, experience, contact";

export const CONTACT_SEO_DESCRIPTION =
  "Get in touch: contact form and professional links.";

export const sitePageTitle = (page: string): string =>
  `${page} | ${SITE_SEO_TITLE_SUFFIX}`;
