/**
 * Terms Page - Terms of service placeholder
 */

import React from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./Terms.module.css";

export const Terms: React.FC = () => {
  useSEO({
    title: "Terms of Service | Portfolio",
    description: "Use of this portfolio site. No warranty.",
    type: "website",
  });

  return (
    <Section
      title="Terms of Service"
      subtitle="Use of this portfolio site"
      id="terms"
    >
      <div className={styles.content}>
        <Typography variant="body" color="secondary" as="p">
          By using this site you agree to use it for its intended purpose (e.g.
          viewing portfolio content, sending contact messages). No warranty is
          given. Full terms will be published here when applicable.
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
