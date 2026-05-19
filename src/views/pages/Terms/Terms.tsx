/**
 * Terms — fair use of this portfolio site and its content.
 */

import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { sitePageTitle } from "@/config/site-defaults";
import styles from "./Terms.module.css";

export const Terms: React.FC = () => {
  useSEO({
    title: sitePageTitle("Terms of Service"),
    description: "Terms of use for this portfolio site.",
    type: "website",
  });

  return (
    <div className={`pf-page ${styles.terms}`}>
      <header className="pf-hero" aria-labelledby="terms-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <div className="pf-hero-copy">
            <p className="pf-eyebrow">Legal</p>
            <h1 id="terms-hero-title" className="pf-hero-title">
              Terms of Service
            </h1>
            <p className="pf-hero-lead">
              Fair use of this portfolio, its case studies, and contact
              features.
            </p>
          </div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--prose">
          <header className="pf-block-head">
            <div>
              <p className="pf-block-eyebrow">Terms</p>
              <h2 className="pf-block-title">Using this site</h2>
              <p className="pf-block-lead">
                By browsing or contacting me through this site, you agree to the
                following.
              </p>
            </div>
          </header>

          <div className={styles.prose}>
            <Typography variant="body" color="secondary" as="p">
              This site is a personal portfolio for professional reference. You
              may view content, follow project links, and use the contact form
              for legitimate inquiries related to work or collaboration.
            </Typography>
            <Typography variant="body" color="secondary" as="p">
              Case studies, screenshots, and metrics describe real work where
              noted; do not reproduce project assets or copy without permission.
              The site is provided as-is without warranty.
            </Typography>
            <Typography variant="body" color="secondary" as="p">
              Full terms of service with jurisdiction-specific language can be
              published here when applicable.
            </Typography>
          </div>
          <div className="page-actions page-actions--start">
            <LinkButton to="/contact" variant="primary">
              Contact
            </LinkButton>
            <LinkButton to="/" variant="outline">
              Home
            </LinkButton>
            <LinkButton to="/privacy" variant="ghost">
              Privacy policy
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
