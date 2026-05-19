/**
 * PageShell — DRY wrapper for page-inner + optional accent rail (design-system).
 */

import React from "react";

export interface PageShellProps {
  children: React.ReactNode;
  /** Narrow max-width (~56rem) for timelines, prose, learning */
  narrow?: boolean;
  /** Prose width (~70ch) for legal copy */
  prose?: boolean;
  /** Accent rail below section header (use when Section showTrackAccent is false) */
  rail?: boolean;
  railStyle?: React.CSSProperties;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  narrow = false,
  prose = false,
  rail = false,
  railStyle,
  className = "",
}) => {
  const classes = [
    "page-inner",
    narrow && "page-inner--narrow",
    prose && "page-inner--prose",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {rail ? (
        <div className="track-accent" style={railStyle} aria-hidden="true" />
      ) : null}
      {children}
    </div>
  );
};
