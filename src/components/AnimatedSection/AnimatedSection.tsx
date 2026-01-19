/**
 * AnimatedSection Component - Section with scroll reveal animation
 */

import React, { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Section, SectionProps } from "@/views/components/layout/Section";
import styles from "./AnimatedSection.module.css";

export interface AnimatedSectionProps extends SectionProps {
  children: ReactNode;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  ...sectionProps
}) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <Section
      {...sectionProps}
      className={`${sectionProps.className || ""} ${styles.animatedSection} ${isVisible ? styles.visible : ""}`}
      style={{ animationDelay: `${delay}ms`, ...sectionProps.style }}
    >
      <div ref={elementRef as React.RefObject<HTMLDivElement>}>{children}</div>
    </Section>
  );
};
