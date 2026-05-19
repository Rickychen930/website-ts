/**
 * Privacy — data handling policy for the portfolio site.
 */

import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { sitePageTitle } from "@/config/site-defaults";
import styles from "./Privacy.module.css";

export const Privacy: React.FC = () => {
  useSEO({
    title: sitePageTitle("Privacy Policy"),
    description: "How this portfolio handles contact data and site usage.",
    type: "website",
  });

  return (
    <div className={`pf-page ${styles.privacy}`}>
      <header className="pf-hero" aria-labelledby="privacy-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <div className="pf-hero-copy">
            <p className="pf-eyebrow">Legal</p>
            <h1 id="privacy-hero-title" className="pf-hero-title">
              Privacy Policy
            </h1>
            <p className="pf-hero-lead">
              How this site collects, uses, and protects information when you
              browse or send a message.
            </p>
          </div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--prose">
          <header className="pf-block-head">
            <div>
              <p className="pf-block-eyebrow">Policy</p>
              <h2 className="pf-block-title">Your data on this site</h2>
              <p className="pf-block-lead">
                A plain-language summary — a full policy can be published here
                when required.
              </p>
            </div>
          </header>

          <div className={styles.prose}>
            <Typography variant="body" color="secondary" as="p">
              This portfolio may store contact form submissions (name, email,
              message) so I can respond to inquiries. Data is used only to reply
              — not sold or shared with third parties for marketing.
            </Typography>
            <Typography variant="body" color="secondary" as="p">
              Analytics, if enabled, are aggregated and used to improve the site
              experience. You can reach out via the contact page to ask about
              data you have submitted.
            </Typography>
            <Typography variant="body" color="secondary" as="p">
              A complete privacy policy with jurisdiction-specific details will
              be linked here when applicable.
            </Typography>
          </div>
          <div className="page-actions page-actions--start">
            <LinkButton to="/contact" variant="primary">
              Contact
            </LinkButton>
            <LinkButton to="/" variant="outline">
              Home
            </LinkButton>
            <LinkButton to="/terms" variant="ghost">
              Terms of service
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
