/**
 * SEOHead - SEO Optimization Component
 * Best practices for SEO and meta tags
 * 
 * Features:
 * - Dynamic meta tags
 * - Open Graph support
 * - Twitter Cards
 * - Structured data
 * - Performance optimized
 */

import React, { memo, useEffect } from 'react';

export interface ISEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

/**
 * SEOHead Component
 * Manages SEO meta tags and structured data
 */
const SEOHeadComponent: React.FC<ISEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  canonical,
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description);
    }

    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    if (author) {
      updateMetaTag('author', author);
    }

    // Robots
    const robots = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    updateMetaTag('robots', robots);

    // Open Graph
    updateMetaTag('og:title', title || document.title, 'property');
    if (description) {
      updateMetaTag('og:description', description, 'property');
    }
    updateMetaTag('og:type', type, 'property');
    if (url) {
      updateMetaTag('og:url', url, 'property');
    }
    if (image) {
      updateMetaTag('og:image', image, 'property');
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || document.title);
    if (description) {
      updateMetaTag('twitter:description', description);
    }
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Canonical URL
    if (canonical || url) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical || url || window.location.href);
    }

    // Structured data (JSON-LD)
    if (type === 'article' && (publishedTime || modifiedTime)) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        ...(title && { headline: title }),
        ...(description && { description }),
        ...(author && { author: { '@type': 'Person', name: author } }),
        ...(publishedTime && { datePublished: publishedTime }),
        ...(modifiedTime && { dateModified: modifiedTime }),
        ...(image && { image }),
      };

      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    noindex,
    nofollow,
    canonical,
  ]);

  return null; // This component doesn't render anything
};

export const SEOHead = memo(SEOHeadComponent);