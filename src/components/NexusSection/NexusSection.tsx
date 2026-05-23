/**
 * NexusSection — glass panel shell matching Home Quantum Nexus sections.
 */

import React from "react";
import styles from "./NexusSection.module.css";

export interface NexusSectionProps {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const NexusSection: React.FC<NexusSectionProps> = ({
  id,
  eyebrow,
  title,
  lead,
  action,
  children,
  className = "",
  contentClassName = "",
}) => {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={`${styles.section} ${className}`}
      aria-labelledby={titleId}
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.orbCyan} />
        <span className={styles.orbMagenta} />
        <span className={styles.gridFloor} />
      </div>

      <header className={styles.head}>
        <div className={styles.headCopy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {action ? <div className={styles.headAction}>{action}</div> : null}
      </header>

      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </section>
  );
};
