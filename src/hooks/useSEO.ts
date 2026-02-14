/**
 * useSEO Hook - Dynamic SEO meta tags management
 * Provides SEO meta tags per page with structured data
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
}

export const useSEO = (seoData: SEOData) => {
  const location = useLocation();
  const { profile } = useProfile();

  useEffect(() => {
    const baseUrl = window.location.origin;
    const currentUrl = `${baseUrl}${location.pathname}`;
    const imageUrl = seoData.image || `${baseUrl}/logo512.png`;
    const siteName = profile?.name || "Ricky Chen Portfolio";

    // Update document title
    document.title = seoData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`,
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    // Primary meta tags
    updateMetaTag("title", seoData.title);
    updateMetaTag("description", seoData.description);
    if (seoData.keywords) {
      updateMetaTag("keywords", seoData.keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", seoData.title, true);
    updateMetaTag("og:description", seoData.description, true);
    updateMetaTag("og:image", imageUrl, true);
    updateMetaTag("og:url", seoData.url || currentUrl, true);
    updateMetaTag("og:type", seoData.type || "website", true);
    updateMetaTag("og:site_name", siteName, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    updateMetaTag("twitter:title", seoData.title, true);
    updateMetaTag("twitter:description", seoData.description, true);
    updateMetaTag("twitter:image", imageUrl, true);
    updateMetaTag("twitter:url", seoData.url || currentUrl, true);

    // Canonical URL
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = seoData.url || currentUrl;
  }, [location.pathname, seoData, profile]);
};

/**
 * Generate structured data (JSON-LD) for SEO
 */
export const generateStructuredData = (data: {
  type: "Person" | "WebSite" | "Article" | "Project";
  profile?: any;
  pageData?: any;
}) => {
  const baseUrl = window.location.origin;

  switch (data.type) {
    case "Person": {
      if (!data.profile) return null;
      const profile = data.profile;
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.title,
        description: profile.bio,
        url: baseUrl,
        sameAs: profile.socialLinks?.map((link: any) => link.url) || [],
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location?.split(",")[0] || "",
          addressCountry: profile.location?.split(",")[1]?.trim() || "",
        },
        knowsAbout:
          profile.technicalSkills
            ?.flatMap((skill: any) => skill.items || [])
            .slice(0, 10) || [],
      };
    }

    case "WebSite": {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.profile?.name || "Ricky Chen Portfolio",
        url: baseUrl,
        description: data.profile?.bio || "",
        publisher: {
          "@type": "Person",
          name: data.profile?.name || "Ricky Chen",
        },
      };
    }

    case "Project": {
      if (!data.pageData) return null;
      const project = data.pageData;
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Person",
          name: data.profile?.name || "Ricky Chen",
        },
      };
    }

    case "Article": {
      if (!data.pageData) return null;
      const article = data.pageData as {
        headline: string;
        description?: string;
        image?: string;
        url?: string;
        sectionName?: string;
      };
      const authorName = data.profile?.name || "Ricky Chen";
      const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.headline,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Person",
          name: authorName,
        },
      };
      if (article.description) schema.description = article.description;
      if (article.image) schema.image = article.image;
      if (article.url)
        schema.mainEntityOfPage = { "@type": "WebPage", "@id": article.url };
      if (article.sectionName) schema.articleSection = article.sectionName;
      return schema;
    }

    default:
      return null;
  }
};

/**
 * Hook to inject structured data into page
 */
export const useStructuredData = (structuredData: object | null) => {
  useEffect(() => {
    if (!structuredData) return;

    // Remove existing structured data script
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    script.id = "structured-data";
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector("#structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [structuredData]);
};
