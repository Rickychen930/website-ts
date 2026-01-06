/**
 * SEO Utilities
 * Professional SEO management for the portfolio
 * Follows DRY principle - Uses centralized constants
 */

import { UserProfile } from "../types/user";
import { SEOLabels } from "../constants";
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
  injectMultipleStructuredData,
} from "./structured-data";

/**
 * Update document title
 */
export function updateTitle(title: string): void {
  document.title = title;
}

/**
 * Update meta tag
 */
export function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

/**
 * Update Open Graph tag
 */
export function updateOGTag(property: string, content: string): void {
  let meta = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

/**
 * Update Twitter Card tag
 */
export function updateTwitterTag(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(profile: UserProfile): object {
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    url: window.location.href,
    sameAs: profile.contacts
      .filter((contact) => {
        // Filter contacts that have links (LinkedIn, GitHub, etc.)
        const label = contact.label?.toLowerCase() || "";
        return (
          contact.link &&
          (label.includes("linkedin") ||
            label.includes("github") ||
            label.includes("twitter"))
        );
      })
      .map((contact) => contact.link)
      .filter((link): link is string => typeof link === "string"),
  };

  // Add professional skills
  if (profile.technicalSkills && profile.technicalSkills.length > 0) {
    const allSkills: string[] = [];
    profile.technicalSkills.forEach((category) => {
      if (category.items && Array.isArray(category.items)) {
        allSkills.push(...category.items);
      }
    });

    if (allSkills.length > 0) {
      structuredData.knowsAbout = allSkills.map((skill) => ({
        "@type": "Thing",
        name: skill,
      }));
    }
  }

  // Add work experience
  if (profile.experiences && profile.experiences.length > 0) {
    structuredData.worksFor = profile.experiences.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      jobTitle: exp.title,
      // Note: period is a string like "May 2023 - Present", not a date
      // We'll extract what we can or leave it as description
      description: exp.description,
    }));
  }

  return structuredData;
}

/**
 * Inject structured data into page
 */
export function injectStructuredData(data: object): void {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Update SEO metadata from profile
 */
export function updateSEOFromProfile(profile: UserProfile): void {
  const title = `${profile.name} - ${profile.title} | ${SEOLabels.PORTFOLIO}`;
  const description =
    profile.bio ||
    `${SEOLabels.PROFESSIONAL_PORTFOLIO} of ${profile.name}, ${profile.title}`;
  const image = `${window.location.origin}/logo512.png`;
  const url = window.location.href;

  // Update title
  updateTitle(title);

  // Update meta tags
  updateMetaTag("description", description);
  updateMetaTag(
    "keywords",
    `${profile.name}, ${profile.title}, ${SEOLabels.PORTFOLIO}, ${SEOLabels.SOFTWARE_ENGINEER}, ${SEOLabels.DEVELOPER}`,
  );

  // Update Open Graph
  updateOGTag("og:title", title);
  updateOGTag("og:description", description);
  updateOGTag("og:image", image);
  updateOGTag("og:url", url);
  updateOGTag("og:type", "profile");

  // Update Twitter Card
  updateTwitterTag("twitter:card", "summary_large_image");
  updateTwitterTag("twitter:title", title);
  updateTwitterTag("twitter:description", description);
  updateTwitterTag("twitter:image", image);

  // Inject structured data
  const structuredData = generateStructuredData(profile);
  injectStructuredData(structuredData);

  // Inject additional structured data (Organization, WebSite, Breadcrumbs)
  const baseUrl = window.location.origin;
  const additionalSchemas = [];

  // Organization schema
  additionalSchemas.push({
    data: generateOrganizationSchema({
      name: profile.name,
      url: baseUrl,
      description: profile.bio,
      sameAs: profile.contacts
        .filter((contact) => contact.link)
        .map((contact) => contact.link!)
        .filter((link) => typeof link === "string"),
    }),
    id: "organization-schema",
  });

  // WebSite schema
  additionalSchemas.push({
    data: generateWebSiteSchema({
      name: `${profile.name} - ${profile.title}`,
      url: baseUrl,
      description: profile.bio,
    }),
    id: "website-schema",
  });

  // Breadcrumb schema
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: profile.name, url: window.location.href },
  ];
  additionalSchemas.push({
    data: generateBreadcrumbSchema(breadcrumbs),
    id: "breadcrumb-schema",
  });

  injectMultipleStructuredData(additionalSchemas);
}

/**
 * Initialize SEO with default values
 */
export function initializeSEO(): void {
  updateTitle(
    `Ricky Chen - ${SEOLabels.SOFTWARE_ENGINEER} ${SEOLabels.PORTFOLIO}`,
  );
  updateMetaTag(
    "description",
    `${SEOLabels.PROFESSIONAL_PORTFOLIO} ${SEOLabels.SHOWCASING}`,
  );
}
