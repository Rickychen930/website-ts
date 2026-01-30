/**
 * Privacy Page - Privacy policy placeholder
 */

import React from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./Privacy.module.css";

export const Privacy: React.FC = () => {
  useSEO({
    title: "Privacy Policy | Portfolio",
    description: "How we handle your data. Contact form and site usage.",
    type: "website",
  });

  return (
    <Section
      title="Privacy Policy"
      subtitle="How we handle your data"
      id="privacy"
    >
      <div className={styles.content}>
        <Typography variant="body" color="secondary" as="p">
          This portfolio site may collect minimal data (e.g. contact form
          submissions) to respond to your inquiries. No data is sold or shared
          with third parties for marketing. A full privacy policy will be
          published here when applicable.
        </Typography>
        <div className={styles.actions}>
          <Link to="/contact" aria-label="Contact me">
            <Button variant="outline">Contact</Button>
          </Link>
          <Link to="/" aria-label="Back to home">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};
