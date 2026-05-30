import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "@/lib/motion";
import { SplitText } from "@/components/motion/SplitText/SplitText";
import { Button } from "@/components/ui/Button/Button";
import { useProfile } from "@/contexts";
import styles from "./HeroSection.module.css";

const ROLES = ["Fullstack Engineer", "AI Engineer", "Problem Solver"];

interface CodeLine {
  lineNum: number;
  tokens: { color: string; text: string }[];
}

const CODE_LINES: CodeLine[] = [
  {
    lineNum: 1,
    tokens: [
      { color: "var(--accent-1)", text: "const " },
      { color: "#e2e8f0", text: "ricky" },
      { color: "var(--text-dim)", text: " = {" },
    ],
  },
  {
    lineNum: 2,
    tokens: [
      { color: "var(--accent-2)", text: "  role" },
      { color: "var(--text-dim)", text: ": " },
      { color: "#86efac", text: '"Fullstack + AI",' },
    ],
  },
  {
    lineNum: 3,
    tokens: [
      { color: "var(--accent-2)", text: "  stack" },
      { color: "var(--text-dim)", text: ": " },
      { color: "#fcd34d", text: '["React","Node","Python"],' },
    ],
  },
  {
    lineNum: 4,
    tokens: [
      { color: "var(--accent-2)", text: "  location" },
      { color: "var(--text-dim)", text: ": " },
      { color: "#86efac", text: '"Sydney, AU",' },
    ],
  },
  {
    lineNum: 5,
    tokens: [
      { color: "var(--accent-2)", text: "  openToWork" },
      { color: "var(--text-dim)", text: ": " },
      { color: "#fb923c", text: "true," },
    ],
  },
  { lineNum: 6, tokens: [{ color: "var(--text-dim)", text: "};" }] },
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

export const HeroSection: React.FC = () => {
  const { profile } = useProfile();
  const shouldReduce = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  // Mouse parallax mesh
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

  // Role cycling
  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      3200,
    );
    return () => clearInterval(t);
  }, []);

  const github = profile?.contacts?.find((c) => c.type === "github");
  const linkedin = profile?.contacts?.find((c) => c.type === "linkedin");

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      id="hero"
      aria-label="Introduction"
      data-section="hero"
    >
      <div ref={bgRef} className={styles.meshBg} aria-hidden="true" />

      {/* Floating abstract orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.gridLines} aria-hidden="true" />

      {/* Parallax wrapper */}
      <motion.div
        className={styles.parallaxWrap}
        style={shouldReduce ? {} : { y, opacity, scale }}
      >
        <div className={styles.layout}>
          {/* Left — text */}
          <div className={styles.content}>
            {/* Status badge */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ease: [0.25, 0, 0, 1], duration: 0.6 }}
            >
              <span className={styles.badgeDot} />
              <span>Available · Sydney, AU</span>
            </motion.div>

            {/* Name — massive, two lines */}
            <h1 className={styles.name} aria-label="Ricky Chen">
              <span className={styles.nameLine}>
                <SplitText text="RICKY" className="gradient-text" delay={0.2} />
              </span>
              <span className={styles.nameLine2}>
                <SplitText text="CHEN." delay={0.4} />
              </span>
            </h1>

            {/* Role cycling */}
            <div className={styles.roleWrap} aria-live="polite">
              <span className={styles.roleArrow}>↗</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className={styles.role}
                  initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, ease: [0.25, 0, 0, 1], duration: 0.6 }}
            >
              {profile?.heroTagline ??
                "Building fullstack products with research-grade rigor."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, ease: [0.25, 0, 0, 1], duration: 0.6 }}
            >
              <Button as="a" href="#projects" variant="primary">
                View Work
              </Button>
              <Button as="a" href="/resume" variant="ghost">
                Resume →
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              className={styles.socials}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
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
            </motion.div>
          </div>

          {/* Right — code card */}
          <motion.div
            className={styles.codeCard}
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ ease: [0.25, 0, 0, 1], duration: 0.9, delay: 0.5 }}
            aria-hidden="true"
          >
            <div className={styles.codeHeader}>
              <span
                className={styles.trafficDot}
                style={{ background: "#ef4444" }}
              />
              <span
                className={styles.trafficDot}
                style={{ background: "#f59e0b" }}
              />
              <span
                className={styles.trafficDot}
                style={{ background: "#22c55e" }}
              />
              <span className={styles.fileName}>ricky.ts</span>
              <span className={styles.fileStatus}>● edited</span>
            </div>
            <div className={styles.codeBody}>
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  className={styles.codeLine}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 0.35 }}
                >
                  <span className={styles.lineNum}>
                    {String(line.lineNum).padStart(2, " ")}
                  </span>
                  <span>
                    {line.tokens.map((t, ti) => (
                      <span key={ti} style={{ color: t.color }}>
                        {t.text}
                      </span>
                    ))}
                  </span>
                </motion.div>
              ))}
              <motion.span
                className={styles.cursor}
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Floating badges */}
            {[
              {
                label: "⚡ React 19",
                color: "#06b6d4",
                top: "-1rem",
                right: "1rem",
              },
              {
                label: "🔷 TypeScript",
                color: "#6366f1",
                bottom: "2rem",
                left: "-2rem",
              },
              {
                label: "🟢 Node.js",
                color: "#22c55e",
                top: "35%",
                right: "-2.2rem",
              },
            ].map((b, i) => (
              <motion.span
                key={b.label}
                className={styles.floatBadge}
                style={{
                  top: b.top,
                  right: b.right,
                  bottom: b.bottom,
                  left: b.left,
                  borderColor: b.color,
                  color: b.color,
                }}
                animate={shouldReduce ? {} : { y: [0, -5, 0] }}
                transition={{
                  duration: 3 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollCue}
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </motion.div>

      {/* Decorative index */}
      <span className={styles.sectionNum} aria-hidden="true">
        00
      </span>
    </section>
  );
};
