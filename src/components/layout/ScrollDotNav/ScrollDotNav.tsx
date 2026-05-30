import React, { useEffect, useState } from "react";
import { motion } from "@/lib/motion";
import styles from "./ScrollDotNav.module.css";

interface NavSection {
  id: string;
  label: string;
}

interface ScrollDotNavProps {
  sections: NavSection[];
}

export const ScrollDotNav: React.FC<ScrollDotNavProps> = ({ sections }) => {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={styles.dot}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
          aria-current={active === id ? "true" : undefined}
        >
          {active === id && (
            <motion.span
              layoutId="dot-active"
              className={styles.activeFill}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
};
