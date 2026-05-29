import React from "react";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { CountUp } from "@/components/motion/CountUp/CountUp";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import styles from "./AboutSection.module.css";

const WHAT_I_BUILD = [
  {
    icon: "⚡",
    title: "Fullstack Products",
    desc: "End-to-end: React frontends, Node/Express APIs, SQL & NoSQL databases — from architecture to deployment.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "LLM-powered features, AI chatbots, and intelligent summarisers. Practical ML applied to real product problems.",
  },
  {
    icon: "🏗️",
    title: "System Architecture",
    desc: "Scalable backend design, API contracts, caching strategies, and clean separation of concerns.",
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

  return (
    <Section id="about" sectionNumber="02" data-section="about">
      <div className={styles.grid}>
        <div className={styles.left}>
          <FadeUp>
            <span className={styles.sectionLabel}>About</span>
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
            <div className={styles.whatIBuild}>
              <h3 className={styles.whatTitle}>What I build</h3>
              <div className={styles.items}>
                {WHAT_I_BUILD.map((item, i) => (
                  <FadeUp key={i} delay={0.25 + i * 0.08}>
                    <div className={styles.item}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                      <div>
                        <strong className={styles.itemTitle}>
                          {item.title}
                        </strong>
                        <p className={styles.itemDesc}>{item.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        <div className={styles.right}>
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <CountUp
                key={i}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                ringPercent={stat.ring}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
