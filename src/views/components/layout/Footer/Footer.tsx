/**
 * Footer Component - Creative footer dengan social links dan newsletter
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Typography } from "@/views/components/ui/Typography";
import { SocialLinks } from "@/components/SocialLinks";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const { profile } = useProfile();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic here
    setNewsletterStatus("success");
    setEmail("");
    setTimeout(() => setNewsletterStatus("idle"), 3000);
  };

  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand Section */}
            <div className={styles.footerSection}>
              <Typography
                variant="h5"
                weight="bold"
                className={styles.footerBrand}
              >
                {profile?.name || "Ricky Chen"}
              </Typography>
              <Typography
                variant="body"
                color="secondary"
                className={styles.footerTagline}
              >
                {profile?.title || "Software Engineer & AI Researcher"}
              </Typography>
              <Typography
                variant="small"
                color="tertiary"
                className={styles.footerLocation}
              >
                📍 {profile?.location || "Sydney, Australia"}
              </Typography>
              <div className={styles.socialLinksWrapper}>
                <SocialLinks />
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <Typography
                variant="h6"
                weight="semibold"
                className={styles.sectionTitle}
              >
                Quick Links
              </Typography>
              <nav className={styles.footerNav} aria-label="Footer navigation">
                {footerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div className={styles.footerSection} data-print="hide">
              <Typography
                variant="h6"
                weight="semibold"
                className={styles.sectionTitle}
              >
                Stay Updated
              </Typography>
              <Typography
                variant="small"
                color="secondary"
                className={styles.newsletterDescription}
              >
                Get notified about new projects and updates
              </Typography>
              <form
                onSubmit={handleNewsletterSubmit}
                className={styles.newsletterForm}
              >
                <div className={styles.newsletterInputGroup}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                    aria-label="Newsletter email"
                    required
                  />
                  <button
                    type="submit"
                    className={styles.newsletterButton}
                    aria-label="Subscribe"
                  >
                    →
                  </button>
                </div>
                {newsletterStatus === "success" && (
                  <p className={styles.newsletterSuccess} role="alert">
                    ✓ Subscribed successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <Typography variant="small" color="tertiary" as="p">
            © {currentYear} {profile?.name || "Portfolio"}. All rights
            reserved.
          </Typography>
          <div className={styles.footerBottomLinks}>
            <Link
              to="/privacy"
              className={styles.footerBottomLink}
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <span className={styles.separator} aria-hidden="true">
              •
            </span>
            <Link
              to="/terms"
              className={styles.footerBottomLink}
              aria-label="Terms of Service"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
