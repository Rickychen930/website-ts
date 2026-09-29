import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "@/lib/motion";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { Button } from "@/components/ui/Button/Button";
import { Ribbon } from "@/components/motion/Ribbon/Ribbon";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FLOW_MEDIA, PLACE_NAMES } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import styles from "./HeroSection.module.css";

const SKY = FLOW_MEDIA.heroUluru;
const RESUME_PDF = "/Ricky-Chen-Resume-2026.pdf";
const HIGHLIGHTS = [
  "Ex-Samsung R&D",
  "MSc AI · UTS · GPA 6.63/7",
  "300+ production commits",
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />
  </svg>
);
const DEEP = FLOW_MEDIA.kakadu;

/**
 * Pinned, scroll-scrubbed journey (Web Architech "CoastalJourney" pattern):
 * Uluru zooms in, the wordmark lifts away, then the Kakadu layer rises over
 * the lens carrying the practice statement.
 */
export const HeroSection: React.FC = () => {
  const { profile } = useProfile();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
  });

  // Layer transforms derived from one progress value (like w26 --p/--r)
  const skyScale = useTransform(p, [0, 1], [1, 1.38]);
  const fgY = useTransform(p, [0, 0.6], ["0vh", "-42vh"]);
  const fgScale = useTransform(p, [0, 0.6], [1, 0.82]);
  const fgOpacity = useTransform(p, [0.2, 0.55], [1, 0]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const deepY = useTransform(p, [0.38, 0.78], ["112%", "0%"]);
  const deepScale = useTransform(p, [0.38, 1], [1.2, 1]);
  const textY = useTransform(p, [0.6, 0.95], ["40px", "0px"]);
  const textOpacity = useTransform(p, [0.6, 0.85], [0, 1]);

  const name = profile?.name ?? "Ricky Chen";
  const role =
    profile?.title || "Software Engineer · AI & Full-Stack Developer";
  const tagline =
    profile?.heroTagline ??
    "I build AI-powered products and full-stack platforms — from LLM chatbots to production web apps.";
  const socials = (profile?.contacts ?? []).filter(
    (c) => c.type === "github" || c.type === "linkedin",
  );

  const still = (v: unknown) => (reduce ? undefined : v);

  return (
    <section
      ref={ref}
      id="hero"
      className={styles.hero}
      aria-label="Introduction"
      data-section="hero"
    >
      <div className={styles.stage}>
        {/* Sky — Uluru at dawn */}
        <motion.div
          className={styles.sky}
          style={still({ scale: skyScale }) as never}
        >
          <FlowMedia item={SKY} priority showPendingLabel={false} />
        </motion.div>
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        {/* Foreground — wordmark & CTAs */}
        <motion.div
          className={styles.fg}
          style={still({ y: fgY, scale: fgScale, opacity: fgOpacity }) as never}
        >
          <span className={styles.badge}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile?.openToOpportunities === false
              ? "Based in Sydney, Australia"
              : "Open to work · Sydney, Australia"}
          </span>
          <h1 className={styles.wordmark} aria-label={`${name}, ${role}`}>
            <RevealText lines={[name]} as="span" immediate delay={0.9} />
          </h1>
          <p className={styles.role}>{role}</p>
          <p className={styles.tagline}>{tagline}</p>
          <ul className={styles.proof} aria-label="Highlights">
            {HIGHLIGHTS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <Button as="a" href="#projects" variant="inverse">
              View projects <span className={styles.arrow}>→</span>
            </Button>
            <Button
              as="a"
              href={RESUME_PDF}
              download="Ricky-Chen-Resume.pdf"
              variant="outlineInverse"
            >
              Download CV
            </Button>
            {socials.map((c) => (
              <a
                key={c.type}
                href={c.value}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label={c.type === "github" ? "GitHub" : "LinkedIn"}
                data-magnetic=""
              >
                {c.type === "github" ? <GitHubIcon /> : <LinkedInIcon />}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className={styles.cue}
          style={still({ opacity: cueOpacity }) as never}
        >
          <span className={styles.cueLine} aria-hidden="true" />
          Scroll to explore
        </motion.a>

        <motion.div
          className={styles.ribbonWrap}
          style={still({ opacity: fgOpacity }) as never}
        >
          <Ribbon items={PLACE_NAMES} speed={38} />
        </motion.div>

        {/* Deep — Kakadu rises over the lens */}
        {!reduce && (
          <motion.div className={styles.deep} style={{ y: deepY }}>
            <motion.div
              className={styles.deepMedia}
              style={{ scale: deepScale }}
            >
              <FlowMedia item={DEEP} showPendingLabel={false} />
            </motion.div>
            <div className={styles.deepScrim} aria-hidden="true" />
            <motion.div
              className={styles.deepInner}
              style={{ y: textY, opacity: textOpacity }}
            >
              <span className={`eyebrow ${styles.eyebrow}`}>What I do</span>
              <h2 className={styles.deepTitle}>
                Products people use. <em>Systems that last.</em>
              </h2>
              <p className={styles.deepText}>
                AI features, full-stack platforms and the infrastructure
                underneath — designed, built and shipped end to end.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
