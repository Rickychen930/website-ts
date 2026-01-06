/**
 * Structured Data Utilities
 * Generates JSON-LD structured data for SEO
 */

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[]; // Social media links
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(data: OrganizationSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && {
      logo: {
        "@type": "ImageObject",
        url: data.logo,
      },
    }),
    ...(data.description && { description: data.description }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Person schema
 */
export function generatePersonSchema(data: {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  email?: string;
  sameAs?: string[];
  description?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    ...(data.jobTitle && { jobTitle: data.jobTitle }),
    ...(data.url && { url: data.url }),
    ...(data.image && {
      image: {
        "@type": "ImageObject",
        url: data.image,
      },
    }),
    ...(data.email && { email: data.email }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
    ...(data.description && { description: data.description }),
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(data: {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    ...(data.potentialAction && { potentialAction: data.potentialAction }),
  };
}

/**
 * Inject structured data into page
 */
export function injectStructuredData(data: object, id?: string): void {
  if (typeof document === "undefined") return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id || "structured-data";
  script.textContent = JSON.stringify(data);

  // Remove existing script with same id
  const existing = document.getElementById(script.id);
  if (existing) {
    existing.remove();
  }

  document.head.appendChild(script);
}

/**
 * Generate and inject multiple structured data
 */
export function injectMultipleStructuredData(
  schemas: Array<{ data: object; id?: string }>,
): void {
  schemas.forEach(({ data, id }) => {
    injectStructuredData(data, id);
  });
}
