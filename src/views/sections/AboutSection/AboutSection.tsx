import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { CountUp } from "@/components/motion/CountUp/CountUp";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import styles from "./AboutSection.module.css";

const WHAT_I_BUILD = [
  {
    icon: "⚡",
    title: "Fullstack Products",
    desc: "End-to-end: React frontends, Node/Express APIs, SQL & NoSQL databases.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "LLM-powered features, AI chatbots, and intelligent summarisers.",
  },
  {
    icon: "🏗️",
    title: "System Architecture",
    desc: "Scalable backend design, API contracts, caching strategies.",
  },
];

const STATS = [
  { target: 5, suffix: "+", label: "Years experience", ring: 70 },
  { target: 20, suffix: "+", label: "Projects shipped", ring: 80 },
  { target: 3, suffix: "", label: "Countries worked", ring: 50 },
  { target: 999, suffix: "+", label: "Coffees consumed", ring: 99 },
];

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  const bio =
    profile?.bio ??
    "I build across backend, mobile, and web — from high-scale connected products to polished interfaces, applying a competitive-programming mindset to design, delivery, and outcomes.";

  const avatarUrl = profile?.avatarUrl ?? "/images/ricky-chen-portrait.png";

  return (
    <Section id="about" sectionNumber="02" data-section="about">
      <div className={styles.topRow}>
        {/* Photo card */}
        <FadeUp delay={0}>
          <div className={styles.photoWrap}>
            <motion.div
              className={styles.photoCard}
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img
                src={avatarUrl}
                alt="Ricky Chen"
                className={styles.photo}
                loading="lazy"
                width={320}
                height={400}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className={styles.photoOverlay} />
            </motion.div>
            <div className={styles.photoAccent} aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Bio + what I build */}
        <div className={styles.bioCol}>
          <FadeUp>
            <span className={styles.sectionLabel}>About</span>
            <h2 className={styles.heading}>Ricky Chen</h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className={styles.bio}>
              {bio
                .split(/(fullstack|AI|Sydney|React|Node|TypeScript|Python)/gi)
                .map((part, i) =>
                  /fullstack|AI|Sydney|React|Node|TypeScript|Python/i.test(
                    part,
                  ) ? (
                    <mark key={i} className={styles.highlight}>
                      {part}
                    </mark>
                  ) : (
                    part
                  ),
                )}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className={styles.items}>
              {WHAT_I_BUILD.map((item, i) => (
                <motion.div
                  key={i}
                  className={styles.item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    ease: [0.25, 0, 0, 1],
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                  }}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <div>
                    <strong className={styles.itemTitle}>{item.title}</strong>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        {STATS.map((stat, i) => (
          <FadeUp key={i} delay={0.1 + i * 0.07}>
            <CountUp
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              ringPercent={stat.ring}
            />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
};
