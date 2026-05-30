import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  sectionNumber?: string;
  "data-section"?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  sectionNumber,
  "data-section": dataSection,
}) => (
  <section
    id={id}
    className={[styles.section, className].filter(Boolean).join(" ")}
    data-section={dataSection}
  >
    {sectionNumber && (
      <span className={styles.sectionNumber} aria-hidden="true">
        {sectionNumber}
      </span>
    )}
    <div className={styles.inner}>{children}</div>
  </section>
);
