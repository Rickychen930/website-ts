/**
 * Social Links - Social media links with hover effects
 * Uses data from ProfileContext
 */

import React from "react";
import { useProfile } from "@/contexts/ProfileContext";
import type { Contact } from "@/types/domain";
import styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  className?: string;
  excludePrimary?: boolean;
}

const getContactIcon = (type: Contact["type"]): string => {
  const icons: Record<Contact["type"], string> = {
    email: "✉️",
    phone: "📞",
    linkedin: "💼",
    github: "💻",
    website: "🌐",
    other: "🔗",
  };
  return icons[type] || "🔗";
};

const getContactColor = (type: Contact["type"]): string => {
  // Use CSS variables for consistent theming
  const colors: Record<Contact["type"], string> = {
    email: "var(--color-error-500)",
    phone: "var(--color-accent-500)",
    linkedin: "var(--color-primary-600)",
    github: "var(--text-primary)",
    website: "var(--color-primary-500)",
    other: "var(--text-tertiary)",
  };
  return colors[type] || "var(--text-tertiary)";
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "",
  excludePrimary = true,
}) => {
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return null;
  }

  // Filter contacts - exclude email/phone for social links, or exclude primary contacts
  const socialContacts = profile.contacts.filter((contact) => {
    if (excludePrimary && contact.isPrimary) {
      return false;
    }
    // Include only social media contacts (linkedin, github, website, other)
    return ["linkedin", "github", "website", "other"].includes(contact.type);
  });

  if (socialContacts.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.socialLinks} ${className}`}
      role="list"
      aria-label="Social links"
    >
      {socialContacts.map((contact) => {
        const icon = getContactIcon(contact.type);
        const color = getContactColor(contact.type);
        const href =
          contact.type === "email" ? `mailto:${contact.value}` : contact.value;

        return (
          <a
            key={contact.id}
            href={href}
            target={contact.type === "email" ? undefined : "_blank"}
            rel={contact.type === "email" ? undefined : "noopener noreferrer"}
            className={styles.socialLink}
            aria-label={`Visit ${contact.label}`}
            style={{ "--link-color": color } as React.CSSProperties}
          >
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
            <span className={styles.label}>{contact.label}</span>
          </a>
        );
      })}
    </div>
  );
};
