/**
 * Breadcrumbs Navigation Component
 * Professional breadcrumb navigation for better UX and SEO
 */

import React, { Component, ReactNode } from "react";
import { generateBreadcrumbSchema } from "../../utils/structured-data";
import "../../assets/css/breadcrumbs.css";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

class Breadcrumbs extends Component<BreadcrumbsProps> {
  componentDidMount(): void {
    // Inject structured data for SEO
    this.injectStructuredData();
  }

  componentDidUpdate(): void {
    // Update structured data when items change
    this.injectStructuredData();
  }

  private injectStructuredData(): void {
    const { items } = this.props;
    if (!items || items.length === 0) return;

    // Remove existing breadcrumb schema
    const existing = document.querySelector(
      'script[type="application/ld+json"][data-breadcrumbs]',
    );
    if (existing) {
      existing.remove();
    }

    // Generate and inject new schema
    const schema = generateBreadcrumbSchema(items);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-breadcrumbs", "true");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  private handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ): void => {
    // If it's a hash link, prevent default and scroll smoothly
    if (url.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(url);
      if (element) {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  render(): ReactNode {
    const { items, className = "" } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <nav
        className={`breadcrumbs ${className}`.trim()}
        aria-label="Breadcrumb navigation"
      >
        <ol
          className="breadcrumbs-list"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={index}
                className={`breadcrumbs-item ${isLast ? "active" : ""}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    className="breadcrumbs-link breadcrumbs-link-active"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <a
                    href={item.url}
                    className="breadcrumbs-link"
                    onClick={(e) => this.handleClick(e, item.url)}
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </a>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {!isLast && (
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}

export default Breadcrumbs;
