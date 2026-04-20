/**
 * Privacy Page - Privacy policy placeholder
 */

import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { sitePageTitle } from "@/config/site-defaults";
import styles from "./Privacy.module.css";

export const Privacy: React.FC = () => {
  useSEO({
    title: sitePageTitle("Privacy Policy"),
    description: "How we handle your data. Contact form and site usage.",
    type: "website",
  });

  return (
    <Section
      label="Legal"
      title="Privacy Policy"
      subtitle="How this site handles data and contact information."
      id="privacy"
      headerAlign="start"
      surface="hero"
    >
      <ScrollReveal direction="up" delay={0}>
        <div className={styles.inner}>
          <div className={styles.trackAccent} aria-hidden="true" />
          <div className={styles.content}>
            <Typography variant="body" color="secondary" as="p">
              This portfolio site may collect minimal data (e.g. contact form
              submissions) to respond to your inquiries. No data is sold or
              shared with third parties for marketing. A full privacy policy
              will be published here when applicable.
            </Typography>
            <div className={styles.actions}>
              <LinkButton
                to="/contact"
                variant="outline"
                aria-label="Contact me"
              >
                Contact
              </LinkButton>
              <LinkButton to="/" variant="ghost" aria-label="Back to home">
                Back to Home
              </LinkButton>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
};
