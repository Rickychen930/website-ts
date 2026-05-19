/**
 * NotFound — unknown routes with navigation back to portfolio.
 */

import React from "react";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Typography } from "@/views/components/ui/Typography";
import { LinkButton } from "@/views/components/ui/Button";
import { EmptyStateArt } from "@/components/PortfolioVisuals";

export const NotFound: React.FC = () => {
  const location = useLocation();

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
        <div className="pf-hero-inner">
          <div className="pf-hero-copy">
            <p className="pf-eyebrow">404</p>
            <h1 id="not-found-title" className="pf-hero-title">
              Page not found
            </h1>
            <p className="pf-hero-lead">
              That route is not mapped — the URL may be outdated or mistyped.
            </p>
          </div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner pf-workspace-inner--narrow">
          <div className="page-empty" role="status">
            <div className="page-empty-art" aria-hidden="true">
              <EmptyStateArt
                variant="projects"
                className="page-empty-art-svg"
              />
            </div>
            {location.pathname !== "/" ? (
              <Typography variant="small" color="secondary" as="p">
                Requested path:{" "}
                <code className="page-code">{location.pathname}</code>
              </Typography>
            ) : null}
            <Typography variant="body" color="secondary">
              Head back to the portfolio home or browse projects and experience.
            </Typography>
            <div className="page-actions">
              <LinkButton to="/" variant="primary" aria-label="Back to home">
                Back to home
              </LinkButton>
              <LinkButton
                to="/projects"
                variant="outline"
                aria-label="View projects"
              >
                Projects
              </LinkButton>
              <LinkButton to="/contact" variant="ghost" aria-label="Contact">
                Contact
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
