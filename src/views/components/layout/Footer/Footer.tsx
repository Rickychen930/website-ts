/**
 * Footer Component - Footer with social links and Get in touch CTA
 */

import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Typography } from "@/views/components/ui/Typography";
import { SocialLinks } from "@/components/SocialLinks";
import { LinkButton } from "@/views/components/ui/Button";
import { SITE_BRAND_NAME, SITE_DEFAULT_TAGLINE } from "@/config/site-defaults";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const { profile } = useProfile();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/learning", label: "Learning" },
    { path: "/resume", label: "Resume" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className={styles.footer} role="contentinfo" data-print="hide">
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
                {profile?.name || SITE_BRAND_NAME}
              </Typography>
              <Typography
                variant="body"
                color="secondary"
                className={styles.footerTagline}
              >
                {profile?.title || SITE_DEFAULT_TAGLINE}
              </Typography>
              <p className={styles.footerPresence}>
                <span className={styles.footerPulse} aria-hidden="true" />
                <span>
                  {profile?.openToOpportunities !== false
                    ? "Open to the right conversations — say hello anytime."
                    : "Thanks for visiting — new work lands here first."}
                </span>
              </p>
              {profile?.location ? (
                <Typography
                  variant="small"
                  color="tertiary"
                  className={styles.footerLocation}
                >
                  <span
                    className={styles.footerLocationIcon}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </span>
                  {profile.location}
                </Typography>
              ) : null}
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

            {/* Get in touch CTA */}
            <div className={styles.footerSection}>
              <Typography
                variant="h6"
                weight="semibold"
                className={styles.sectionTitle}
              >
                Get in Touch
              </Typography>
              <Typography
                variant="small"
                color="secondary"
                className={styles.ctaDescription}
              >
                Have a project in mind or want to connect? Say hello.
              </Typography>
              <LinkButton
                to="/contact"
                variant="primary"
                size="md"
                className={styles.ctaLink}
                aria-label="Go to contact page"
              >
                Contact
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <Typography variant="small" color="tertiary" as="p">
            © {currentYear} {profile?.name || SITE_BRAND_NAME}. All rights
            reserved.
          </Typography>
          <div className={styles.footerBottomLinks}>
            <Link
              to="/privacy"
              className={styles.footerBottomLink}
              aria-label="Privacy Policy"
            >
              Privacy
            </Link>
            <span className={styles.separator} aria-hidden="true">
              •
            </span>
            <Link
              to="/terms"
              className={styles.footerBottomLink}
              aria-label="Terms of Service"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
