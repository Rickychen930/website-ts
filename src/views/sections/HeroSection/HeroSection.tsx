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

  const role =
    profile?.title?.split("·")[0]?.trim() || "Fullstack & AI Engineer";
  const tagline =
    profile?.heroTagline ??
    "Designing software the way the land shapes a place — structure first, then light.";

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
          <span className={`eyebrow ${styles.eyebrow}`}>
            {role} · Sydney, Australia
          </span>
          <h1 className={styles.wordmark} aria-label="Ricky Chen">
            <RevealText
              lines={["Ricky Chen"]}
              as="span"
              immediate
              delay={0.9}
            />
          </h1>
          <p className={styles.tagline}>{tagline}</p>
          <div className={styles.ctas}>
            <Button as="a" href="#projects" variant="inverse">
              View selected works →
            </Button>
            <Button as="a" href="/resume" variant="outlineInverse">
              Résumé
            </Button>
          </div>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile?.openToOpportunities === false
              ? "Based in Sydney"
              : "Open to new work"}
            <span className={styles.coords}>
              {SKY.title} · {SKY.caption}
            </span>
          </span>
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
              <span className={`eyebrow ${styles.eyebrow}`}>
                Beyond the surface
              </span>
              <h2 className={styles.deepTitle}>
                Websites are landmarks. <em>Systems are ecosystems.</em>
              </h2>
              <p className={styles.deepText}>
                I design and build both — the part people see, and the living
                infrastructure underneath that keeps it standing.
              </p>
              <span className={styles.deepCaption}>
                {DEEP.title} · {DEEP.caption}
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
