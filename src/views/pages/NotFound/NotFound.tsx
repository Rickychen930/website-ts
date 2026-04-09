/**
 * NotFound Page - Shown for unknown routes (catch-all)
 * Keeps the invalid URL visible and offers navigation back.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  const location = useLocation();

  useSEO({
    title: "Page not found | Portfolio",
    description:
      "The page you are looking for does not exist or has been moved.",
    type: "website",
  });

  return (
    <Section
      id="not-found"
      label="404"
      title="Page not found"
      subtitle="That route is not mapped — the URL may be outdated or mistyped."
      info="Client-side route · use navigation or home"
      headerAlign="start"
      surface="hero"
    >
      <div className={styles.inner}>
        <div className={styles.trackAccent} aria-hidden="true" />
        <div className={styles.content}>
          {location.pathname !== "/" && (
            <Typography variant="small" color="secondary" as="p">
              Requested path:{" "}
              <code className={styles.path}>{location.pathname}</code>
            </Typography>
          )}
          <div className={styles.actions}>
            <Link to="/" aria-label="Back to home">
              <Button variant="primary">Back to Home</Button>
            </Link>
            <Link to="/learning" aria-label="Go to Learning">
              <Button variant="outline">Learning</Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};
