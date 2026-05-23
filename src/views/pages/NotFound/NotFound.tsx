/**
 * NotFound — unknown routes with Nexus glass empty state.
 */

import React from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { EmptyStateArt } from "@/components/PortfolioVisuals";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { SplitText } from "@/components/SplitText/SplitText";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  const location = useLocation();
  const reduced = useReducedMotion() ?? false;

  useSEO({
    title: "Page not found | Portfolio",
    description:
      "The page you are looking for does not exist or has been moved.",
    type: "website",
  });

  return (
    <div className="pf-page">
      <header className="pf-hero" aria-labelledby="not-found-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <motion.div
            className="pf-hero-copy"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={`pf-eyebrow ${styles.codeEyebrow}`}>
              404 · Signal lost
            </p>
            <h1 id="not-found-title" className="pf-hero-title">
              <SplitText text="Page not found" stagger={0.032} />
            </h1>
            <p className="pf-hero-lead">
              That route is not mapped — the URL may be outdated or mistyped.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--narrow">
          <TiltCard className={styles.emptyCard} maxTilt={6}>
            <div className={styles.emptyInner} role="status">
              <div className={styles.emptyArt} aria-hidden="true">
                <EmptyStateArt variant="projects" className={styles.emptySvg} />
              </div>
              {location.pathname !== "/" ? (
                <>
                  <Typography variant="small" color="secondary" as="p">
                    Requested path
                  </Typography>
                  <code className={styles.pathCode}>{location.pathname}</code>
                </>
              ) : null}
              <Typography variant="body" color="secondary">
                Head back to the portfolio home or browse projects and
                experience.
              </Typography>
              <div className={styles.actions}>
                <Magnetic strength={0.2}>
                  <LinkButton
                    to="/"
                    variant="primary"
                    aria-label="Back to home"
                  >
                    Back to home
                  </LinkButton>
                </Magnetic>
                <Magnetic strength={0.16}>
                  <LinkButton
                    to="/projects"
                    variant="outline"
                    aria-label="View projects"
                  >
                    Projects
                  </LinkButton>
                </Magnetic>
                <Magnetic strength={0.14}>
                  <LinkButton
                    to="/contact"
                    variant="ghost"
                    aria-label="Contact"
                  >
                    Contact
                  </LinkButton>
                </Magnetic>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
