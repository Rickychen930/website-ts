import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "@/lib/motion";
import { SplitText } from "@/components/motion/SplitText/SplitText";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Button } from "@/components/ui/Button/Button";
import { useProfile } from "@/contexts";
import styles from "./HeroSection.module.css";

const ROLES = ["Fullstack Engineer", "AI Engineer", "Problem Solver"];

const CODE_LINES = [
  { token: "const", text: " ricky = {" },
  { token: "key", text: "  role:" },
  { token: "string", text: ' "Fullstack + AI",' },
  { token: "key", text: "  location:" },
  { token: "string", text: ' "Sydney, AU",' },
  { token: "key", text: "  available:" },
  { token: "bool", text: " true," },
  { token: "plain", text: "};" },
];

const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TOKEN_COLORS: Record<string, string> = {
  const: "var(--accent-1)",
  key: "var(--accent-2)",
  string: "#86efac",
  bool: "#fb923c",
  plain: "var(--text-muted)",
};

export const HeroSection: React.FC = () => {
  const { profile } = useProfile();
  const shouldReduce = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduce) return;
    const el = bgRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      el.style.setProperty(
        "--my",
        `${(e.clientY / window.innerHeight) * 100}%`,
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [shouldReduce]);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  const github = profile?.contacts?.find((c) => c.type === "github");
  const linkedin = profile?.contacts?.find((c) => c.type === "linkedin");

  return (
    <section
      className={styles.hero}
      id="hero"
      aria-label="Introduction"
      data-section="hero"
    >
      <div ref={bgRef} className={styles.meshBg} aria-hidden="true" />

      <div className={styles.layout}>
        {/* Left — text content */}
        <div className={styles.content}>
          <FadeUp delay={0}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              Available for work · Sydney, AU
            </span>
          </FadeUp>

          <h1 className={styles.name} aria-label="Ricky Chen">
            <SplitText
              text="RICKY"
              className={`${styles.nameLine} gradient-text`}
              delay={0.15}
            />
            <SplitText
              text="CHEN"
              className={`${styles.nameLineDim}`}
              delay={0.35}
            />
          </h1>

          <div className={styles.roleWrap} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className={styles.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <FadeUp delay={0.5}>
            <p className={styles.bio}>
              {profile?.heroTagline ??
                "Building fullstack products with research-grade rigor."}
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className={styles.ctas}>
              <Button as="a" href="#projects" variant="primary">
                View Work
              </Button>
              <Button as="a" href="/resume" variant="ghost">
                Resume
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.7}>
            <div className={styles.socials}>
              {github && (
                <a
                  href={github.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={styles.socialLink}
                  data-cursor="open"
                >
                  <GitHubIcon />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={styles.socialLink}
                  data-cursor="open"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </FadeUp>
        </div>

        {/* Right — animated code card */}
        <motion.div
          className={styles.codeCard}
          initial={{ opacity: 0, y: 32, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ ease: [0.25, 0, 0, 1], duration: 0.8, delay: 0.6 }}
          aria-hidden="true"
        >
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{ background: "#ef4444" }} />
            <span className={styles.dot} style={{ background: "#f59e0b" }} />
            <span className={styles.dot} style={{ background: "#22c55e" }} />
            <span className={styles.fileName}>ricky.ts</span>
          </div>
          <div className={styles.codeBody}>
            {CODE_LINES.map((line, i) => (
              <motion.div
                key={i}
                className={styles.codeLine}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.8 + i * 0.1,
                  ease: "easeOut",
                  duration: 0.4,
                }}
              >
                <span className={styles.lineNum}>{i + 1}</span>
                <span style={{ color: TOKEN_COLORS[line.token] }}>
                  {line.token === "key"
                    ? ""
                    : line.token === "plain"
                      ? ""
                      : line.token + " "}
                </span>
                <span style={{ color: TOKEN_COLORS[line.token] }}>
                  {line.text}
                </span>
              </motion.div>
            ))}
            <motion.span
              className={styles.cursor}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Floating tech badges */}
          {[
            {
              label: "React 19",
              color: "#06b6d4",
              top: "-1.2rem",
              right: "1.5rem",
            },
            {
              label: "TypeScript",
              color: "#6366f1",
              bottom: "0.5rem",
              left: "-1.5rem",
            },
            { label: "Node.js", color: "#22c55e", top: "40%", right: "-2rem" },
          ].map((badge) => (
            <motion.span
              key={badge.label}
              className={styles.floatBadge}
              style={{
                top: badge.top,
                right: badge.right,
                bottom: badge.bottom,
                left: badge.left,
                borderColor: badge.color,
                color: badge.color,
              }}
              animate={shouldReduce ? {} : { y: [0, -6, 0] }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {badge.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollCue}
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        ↓
      </motion.div>

      <span className={styles.sectionNum} aria-hidden="true">
        00
      </span>
    </section>
  );
};
