/**
 * Privacy — data handling policy for the portfolio site.
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
import styles from "./Privacy.module.css";

const CLAUSES = [
  {
    id: "contact-data",
    title: "Contact form data",
    body: "This portfolio may store contact form submissions (name, email, message) so I can respond to inquiries. Data is used only to reply — not sold or shared with third parties for marketing.",
  },
  {
    id: "analytics",
    title: "Analytics",
    body: "Analytics, if enabled, are aggregated and used to improve the site experience. You can reach out via the contact page to ask about data you have submitted.",
  },
  {
    id: "full-policy",
    title: "Full policy",
    body: "A complete privacy policy with jurisdiction-specific details will be linked here when applicable.",
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

export const Privacy: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  useSEO({
    title: sitePageTitle("Privacy Policy"),
    description: "How this portfolio handles contact data and site usage.",
    type: "website",
  });

  return (
    <motion.div
      className={`pf-page ${styles.privacy}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="privacy-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <PageHeroFx />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <motion.div className="pf-hero-copy" {...fadeUp(reduced)}>
            <p className="pf-eyebrow">Legal</p>
            <h1 id="privacy-hero-title" className="pf-hero-title">
              <SplitText text="Privacy Policy" stagger={0.028} />
            </h1>
            <p className="pf-hero-lead">
              How this site collects, uses, and protects information when you
              browse or send a message.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--prose">
          <NexusSection
            id="privacy-policy"
            eyebrow="Policy"
            title={
              <>
                Your data on this <span className="nx-gradient-text">site</span>
              </>
            }
            lead="A plain-language summary — a full policy can be published here when required."
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
                <LinkButton to="/terms" variant="ghost">
                  Terms of service
                </LinkButton>
              </Magnetic>
            </div>
          </NexusSection>
        </div>
      </div>
    </motion.div>
  );
};
