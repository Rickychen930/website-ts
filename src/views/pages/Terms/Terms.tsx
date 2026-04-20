/**
 * Terms Page - Terms of service placeholder
 */

import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { sitePageTitle } from "@/config/site-defaults";
import styles from "./Terms.module.css";

export const Terms: React.FC = () => {
  useSEO({
    title: sitePageTitle("Terms of Service"),
    description: "Use of this portfolio site. No warranty.",
    type: "website",
  });

  return (
    <Section
      label="Legal"
      title="Terms of Service"
      subtitle="Fair use of this portfolio and its content."
      id="terms"
      headerAlign="start"
      surface="hero"
    >
      <ScrollReveal direction="up" delay={0}>
        <div className={styles.inner}>
          <div className={styles.trackAccent} aria-hidden="true" />
          <div className={styles.content}>
            <Typography variant="body" color="secondary" as="p">
              By using this site you agree to use it for its intended purpose
              (e.g. viewing portfolio content, sending contact messages). No
              warranty is given. Full terms will be published here when
              applicable.
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
