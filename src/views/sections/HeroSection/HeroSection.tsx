import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "@/lib/motion";
import { Button } from "@/components/ui/Button/Button";
import { Backdrop } from "@/components/ui/Backdrop/Backdrop";
import { Ribbon } from "@/components/motion/Ribbon/Ribbon";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { useProfile } from "@/contexts";
import { introOffset } from "@/components/motion/CurtainTransition/intro";
import styles from "./HeroSection.module.css";

const PORTRAIT = "/images/ricky-chen-portrait.png";
const RESUME_PDF = "/Ricky-Chen-Resume-2026.pdf";
const HIGHLIGHTS = ["Ex-Samsung R&D", "MSc AI · UTS · GPA 6.63/7"];
const STACK = [
  "Python",
  "TypeScript",
  "React",
  "Node.js",
  "LLM apps",
  "Prompt engineering",
  "Express",
  "MongoDB",
  "SQL",
  "TensorFlow",
  "REST APIs",
  "Docker",
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
/**
 * Typographic hero over a code-drawn aurora: copy on the left, portrait with
 * floating proof cards on the right. On scroll the layers drift apart at
 * different speeds and the copy dims as the next chapter arrives.
 */
export const HeroSection: React.FC = () => {
  const { profile } = useProfile();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });
  const copyY = useTransform(p, [0, 1], ["0px", "-90px"]);
  const copyOpacity = useTransform(p, [0, 0.7], [1, 0.15]);
  const visualY = useTransform(p, [0, 1], ["0px", "-180px"]);
  const visualRotate = useTransform(p, [0, 1], [0, -4]);
  const cardY = useTransform(p, [0, 1], ["0px", "-60px"]);
  const cueOpacity = useTransform(p, [0, 0.15], [1, 0]);

  const name = profile?.name ?? "Ricky Chen";
  const role =
    profile?.title || "Software Engineer · AI & Full-Stack Developer";
  const tagline =
    profile?.heroTagline ??
    "I build AI products and full-stack platforms — from LLM chatbots to production web apps.";
  const socials = (profile?.contacts ?? []).filter(
    (c) => c.type === "github" || c.type === "linkedin",
  );

  // Latest current role leads the proof — the first thing recruiters look for
  const current = (profile?.experiences ?? [])
    .filter((e) => e.isCurrent)
    .sort((a, b) => b.startDate.localeCompare(a.startDate))[0];

  const still = (v: unknown) => (reduce ? undefined : v);
  const d = introOffset();

  return (
    <section
      ref={ref}
      id="hero"
      className={styles.hero}
      aria-label="Introduction"
      data-section="hero"
    >
      <Backdrop />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          style={still({ y: copyY, opacity: copyOpacity }) as never}
        >
          <span className={styles.badge}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile?.openToOpportunities === false ? (
              "Based in Sydney, Australia"
            ) : (
              <>
                Open to work · Sydney
                <span className={styles.badgeMore}>
                  {" "}
                  · Full work rights Jul 2027
                </span>
              </>
            )}
          </span>
          <h1 className={styles.name} aria-label={`${name}, ${role}`}>
            <RevealText lines={[name]} as="span" immediate delay={0.35 + d} />
          </h1>
          <p className={styles.role}>
            {role.split(" · ")[0]}
            {role.includes(" · ") && (
              <>
                {" "}
                <em>{role.split(" · ").slice(1).join(" · ")}</em>
              </>
            )}
          </p>
          <p className={styles.tagline}>{tagline}</p>
          <ul className={styles.proof} aria-label="Highlights">
            {HIGHLIGHTS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <Button as="a" href="#projects" variant="primary">
              View projects <span className={styles.arrow}>→</span>
            </Button>
            <Button
              as="a"
              href={RESUME_PDF}
              download="Ricky-Chen-Resume.pdf"
              variant="ghost"
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

        <motion.div
          className={styles.visual}
          style={still({ y: visualY, rotate: visualRotate }) as never}
        >
          <div className={styles.frame} data-tilt="">
            <img
              src={PORTRAIT}
              alt={`Portrait of ${name}`}
              className={styles.portrait}
              width={682}
              height={1024}
              fetchPriority="high"
            />
            <span className={styles.frameShine} aria-hidden="true" />
          </div>

          {current && (
            <motion.div
              className={`${styles.card} ${styles.cardNow}`}
              style={still({ y: cardY }) as never}
            >
              <span className={styles.cardLabel}>
                <span className={styles.liveDot} aria-hidden="true" /> Now
              </span>
              <span className={styles.cardTitle}>{current.position}</span>
              <span className={styles.cardMeta}>{current.company}</span>
            </motion.div>
          )}

          <motion.div
            className={`${styles.card} ${styles.cardCode}`}
            style={still({ y: cardY }) as never}
            aria-hidden="true"
          >
            <span className={styles.codeLine}>
              <span className={styles.kw}>const</span> stack = [
            </span>
            <span className={styles.codeLine}>
              &nbsp;&nbsp;<span className={styles.str}>"Python"</span>,{" "}
              <span className={styles.str}>"TypeScript"</span>,
            </span>
            <span className={styles.codeLine}>
              &nbsp;&nbsp;<span className={styles.str}>"React"</span>,{" "}
              <span className={styles.str}>"LLMs"</span>
            </span>
            <span className={styles.codeLine}>];</span>
          </motion.div>

          <div className={`${styles.card} ${styles.cardStat}`}>
            <span className={styles.statNum}>300+</span>
            <span className={styles.cardMeta}>commits · Samsung R&amp;D</span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.cue}
        style={still({ opacity: cueOpacity }) as never}
      >
        <span className={styles.cueLine} aria-hidden="true" />
        Scroll
      </motion.a>

      <div className={styles.ribbonWrap}>
        <Ribbon items={STACK} speed={42} />
      </div>
    </section>
  );
};
