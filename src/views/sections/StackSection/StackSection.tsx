import React from "react";
import { useProfile } from "@/contexts";
import styles from "./StackSection.module.css";

/* Inline SVG tech logos — no external dependency */
const TECH_ICONS: Record<string, React.ReactNode> = {
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path
        d="M13.5 13.5V15c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-1.7-3-2-3-4 0-1.1.9-2 2-2s2 .9 2 2"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 11h4M8 11v6"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path
        d="M7 16c0 1.1.9 2 2 2s2-.9 2-2v-5M15 11v5c0 1 .5 2 2 2"
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#20232A" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="3"
        stroke="#61DAFB"
        strokeWidth="1.2"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="3"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="3"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#339933" />
      <path d="M12 4l7 4v8l-7 4-7-4V8z" stroke="#fff" strokeWidth="1.2" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#3776AB" />
      <path
        d="M8 5h4a3 3 0 013 3v2H9a1 1 0 00-1 1v4a3 3 0 003 3h4a3 3 0 003-3v-3"
        stroke="#FFD343"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="8.5" r="1" fill="#FFD343" />
      <circle cx="13.5" cy="15.5" r="1" fill="#FFD343" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#000" />
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M9.5 9.5l7 7M9.5 9.5V15"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#2496ED" />
      <rect x="4" y="11" width="3" height="2.5" rx="0.5" fill="#fff" />
      <rect x="8" y="11" width="3" height="2.5" rx="0.5" fill="#fff" />
      <rect x="12" y="11" width="3" height="2.5" rx="0.5" fill="#fff" />
      <rect x="8" y="8" width="3" height="2.5" rx="0.5" fill="#fff" />
      <rect x="12" y="8" width="3" height="2.5" rx="0.5" fill="#fff" />
      <path
        d="M20 13c-1 1.5-3 2-5 2H4c0 2 1.5 3 4 3h8c3 0 5-2 5-5z"
        fill="#fff"
        opacity="0.6"
      />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#336791" />
      <ellipse cx="12" cy="8" rx="5" ry="3" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M7 8v8c0 1.7 2.2 3 5 3s5-1.3 5-3V8"
        stroke="#fff"
        strokeWidth="1.2"
      />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#13AA52" />
      <path
        d="M12 4c0 0-4 4-4 9s4 7 4 7 4-2 4-7-4-9-4-9z"
        fill="#fff"
        opacity="0.9"
      />
      <path d="M12 4v16" stroke="#fff" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#232F3E" />
      <path
        d="M7 13c-1.5 1-2 2.5-.5 3.5C8 17.5 10 17 12 17s4 .5 5.5-.5c1.5-1 1-2.5-.5-3.5"
        stroke="#FF9900"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8 13V9l4-2 4 2v4"
        stroke="#FF9900"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#F05032" />
      <circle cx="7" cy="7" r="2" stroke="#fff" strokeWidth="1.2" />
      <circle cx="17" cy="7" r="2" stroke="#fff" strokeWidth="1.2" />
      <circle cx="7" cy="17" r="2" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M7 9v6M9 7h6M9 17h2c2 0 4-1 4-4"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#7A86B8" />
      <ellipse cx="12" cy="12" rx="9" ry="5" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M7 10v4M7 10h2a2 2 0 010 4H7M13 10v4M13 10h2a2 2 0 010 4"
        stroke="#fff"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  Swift: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#F05138" />
      <path
        d="M18 8C14 4 8 5 6 9c-1 2 0 4 2 5-1-2 0-4 2-5 3 2 7 2 8-1z"
        fill="#fff"
        opacity="0.9"
      />
      <path
        d="M6 15c0 3 3 5 6 5 2 0 4-1 5-3-1 1-3 1-4 0C9 15 7 11 9 8c-2 2-3 5-3 7z"
        fill="#fff"
      />
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#DC382D" />
      <ellipse cx="12" cy="14" rx="7" ry="3" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M5 14v2c0 1.7 3.1 3 7 3s7-1.3 7-3v-2"
        stroke="#fff"
        strokeWidth="1.2"
      />
      <path d="M9 10l3-2 3 2-3 2z" fill="#fff" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#1E1E1E" />
      <rect x="7" y="4" width="5" height="5" rx="2" fill="#F24E1E" />
      <rect x="12" y="4" width="5" height="5" rx="2" fill="#FF7262" />
      <rect x="7" y="9" width="5" height="5" rx="2" fill="#A259FF" />
      <rect x="7" y="14" width="5" height="5" rx="2" fill="#0ACF83" />
      <circle cx="14.5" cy="11.5" r="2.5" fill="#1ABCFE" />
    </svg>
  ),
  WordPress: (
    <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <rect width="24" height="24" rx="3" fill="#21759B" />
      <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.2" />
      <path
        d="M5.5 12h3M12 5.5v3M15 9l-3 7-3-7"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const DEFAULT_ICON = (name: string) => (
  <span className={styles.iconFallback}>{name.charAt(0)}</span>
);

interface StackItem {
  name: string;
  proficiency?: string;
}

const StackItemCard: React.FC<{ item: StackItem }> = ({ item }) => {
  const icon = TECH_ICONS[item.name] ?? DEFAULT_ICON(item.name);
  return (
    <span className={styles.item}>
      <span className={styles.iconWrap}>{icon}</span>
      <span className={styles.itemName}>{item.name}</span>
    </span>
  );
};

const MarqueeRow: React.FC<{
  items: StackItem[];
  direction: "left" | "right";
  speed: number;
}> = ({ items, direction, speed }) => {
  const doubled = [...items, ...items];
  return (
    <div
      className={styles.track}
      onMouseEnter={(e) =>
        (
          e.currentTarget.querySelector(`.${styles.inner}`) as HTMLElement
        )?.style.setProperty("animation-play-state", "paused")
      }
      onMouseLeave={(e) =>
        (
          e.currentTarget.querySelector(`.${styles.inner}`) as HTMLElement
        )?.style.setProperty("animation-play-state", "running")
      }
    >
      <div
        className={styles.inner}
        style={{
          animationName:
            direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((item, i) => (
          <StackItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export const StackSection: React.FC = () => {
  const { profile } = useProfile();
  const skills = profile?.technicalSkills ?? [];

  const toItem = (s: { name: string; proficiency: string }): StackItem => ({
    name: s.name,
    proficiency: s.proficiency,
  });

  const row1: StackItem[] = skills.length
    ? skills.slice(0, Math.ceil(skills.length / 2)).map(toItem)
    : [
        { name: "TypeScript" },
        { name: "React" },
        { name: "Node.js" },
        { name: "Python" },
        { name: "Next.js" },
        { name: "PostgreSQL" },
        { name: "Docker" },
        { name: "AWS" },
      ];

  const row2: StackItem[] = skills.length
    ? skills.slice(Math.ceil(skills.length / 2)).map(toItem)
    : [
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Git" },
        { name: "Figma" },
        { name: "PHP" },
        { name: "WordPress" },
        { name: "Swift" },
        { name: "JavaScript" },
      ];

  return (
    <section
      className={styles.section}
      aria-label="Tech stack"
      data-section="stack"
    >
      <div className={styles.header}>
        <span className={styles.label}>01 / Stack</span>
        <span className={styles.subtitle}>Technologies I build with</span>
      </div>
      <div className={styles.strips}>
        <MarqueeRow items={row1} direction="left" speed={38} />
        <MarqueeRow items={row2} direction="right" speed={32} />
      </div>
    </section>
  );
};
