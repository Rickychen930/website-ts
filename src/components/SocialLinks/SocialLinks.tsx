/**
 * Social Links - Social media links with hover effects
 */

import React from "react";
import styles from "./SocialLinks.module.css";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const defaultLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com", icon: "💻", color: "#333" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "💼",
    color: "#0077b5",
  },
  { name: "Twitter", url: "https://twitter.com", icon: "🐦", color: "#1da1f2" },
  {
    name: "Email",
    url: "mailto:contact@example.com",
    icon: "✉️",
    color: "#ea4335",
  },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = defaultLinks,
  className = "",
}) => {
  return (
    <div
      className={`${styles.socialLinks} ${className}`}
      role="list"
      aria-label="Social links"
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={`Visit ${link.name}`}
          style={{ "--link-color": link.color } as React.CSSProperties}
        >
          <span className={styles.icon} aria-hidden="true">
            {link.icon}
          </span>
          <span className={styles.label}>{link.name}</span>
        </a>
      ))}
    </div>
  );
};
