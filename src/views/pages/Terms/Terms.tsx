/**
 * Terms — fair use of this portfolio site and its content.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { LinkButton } from "@/views/components/ui/Button";
import { PageHeroFx } from "@/components/PageHeroFx";
import { NexusSection } from "@/components/NexusSection";
import { SplitText } from "@/components/SplitText/SplitText";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import { sitePageTitle } from "@/config/site-defaults";
import styles from "./Terms.module.css";

const CLAUSES = [
  {
    id: "purpose",
    title: "Site purpose",
    body: "This site is a personal portfolio for professional reference. You may view content, follow project links, and use the contact form for legitimate inquiries related to work or collaboration.",
  },
  {
    id: "content",
    title: "Content & assets",
    body: "Case studies, screenshots, and metrics describe real work where noted; do not reproduce project assets or copy without permission. The site is provided as-is without warranty.",
  },
  {
    id: "full-terms",
    title: "Full terms",
    body: "Full terms of service with jurisdiction-specific language can be published here when applicable.",
  },
] as const;

const fadeUp = (reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

export const Terms: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  useSEO({
    title: sitePageTitle("Terms of Service"),
    description: "Terms of use for this portfolio site.",
    type: "website",
  });

  return (
    <motion.div
      className={`pf-page ${styles.terms}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="terms-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <PageHeroFx />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <motion.div className="pf-hero-copy" {...fadeUp(reduced)}>
            <p className="pf-eyebrow">Legal</p>
            <h1 id="terms-hero-title" className="pf-hero-title">
              <SplitText text="Terms of Service" stagger={0.026} />
            </h1>
            <p className="pf-hero-lead">
              Fair use of this portfolio, its case studies, and contact
              features.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--prose">
          <NexusSection
            id="terms-policy"
            eyebrow="Terms"
            title={
              <>
                Using this <span className="nx-gradient-text">site</span>
              </>
            }
            lead="By browsing or contacting me through this site, you agree to the following."
          >
            <ul className={styles.clauseGrid}>
              {CLAUSES.map((clause) => (
                <li key={clause.id}>
                  <article className={styles.clause}>
                    <h3 className={styles.clauseTitle}>{clause.title}</h3>
                    <p className={styles.clauseBody}>{clause.body}</p>
                  </article>
                </li>
              ))}
            </ul>

            <div className="page-actions page-actions--start">
              <Magnetic strength={0.2}>
                <LinkButton to="/contact" variant="primary">
                  Contact
                </LinkButton>
              </Magnetic>
              <Magnetic strength={0.16}>
                <LinkButton to="/" variant="outline">
                  Home
                </LinkButton>
              </Magnetic>
              <Magnetic strength={0.14}>
                <LinkButton to="/privacy" variant="ghost">
                  Privacy policy
                </LinkButton>
              </Magnetic>
            </div>
          </NexusSection>
        </div>
      </div>
    </motion.div>
  );
};
