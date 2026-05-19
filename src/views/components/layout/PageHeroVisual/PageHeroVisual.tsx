/**
 * PageHeroVisual — editorial hero photo for pf-page shells.
 */

import React, { useEffect, useState } from "react";
import { PAGE_VISUALS, type PageVisualKey } from "@/config/page-visuals";
import styles from "./PageHeroVisual.module.css";

export interface PageHeroVisualProps {
  pageKey: PageVisualKey;
  priority?: boolean;
  className?: string;
}

export const PageHeroVisual: React.FC<PageHeroVisualProps> = ({
  pageKey,
  priority = false,
  className,
}) => {
  const visual = PAGE_VISUALS[pageKey];
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [visual.src]);

  const rootClass = ["pf-hero-visual", styles.figure, className]
    .filter(Boolean)
    .join(" ");

  if (failed) {
    return (
      <figure className={rootClass} aria-hidden="true">
        <div className={styles.fallback} data-page={pageKey} />
      </figure>
    );
  }

  return (
    <figure className={rootClass}>
      <img
        src={visual.src}
        alt={visual.alt}
        width={720}
        height={900}
        className={styles.image}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </figure>
  );
};
