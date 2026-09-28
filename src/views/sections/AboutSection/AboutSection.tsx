import React from "react";
import { motion } from "@/lib/motion";
import { Section } from "@/components/layout/Section/Section";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { ScrollWords } from "@/components/motion/ScrollWords/ScrollWords";
import { CountUp } from "@/components/motion/CountUp/CountUp";
import { FLOW_MEDIA, type FlowMediaItem } from "@/config/flowMedia";
import { useProfile } from "@/contexts";
import styles from "./AboutSection.module.css";

const DISCIPLINES = [
  {
    title: "Fullstack products",
    desc: "End-to-end delivery: React frontends, Node/Express APIs, SQL & NoSQL data models.",
  },
  {
    title: "AI integration",
    desc: "LLM-powered features, retrieval pipelines, assistants and intelligent summarisers.",
  },
  {
    title: "System architecture",
    desc: "Scalable backends, API contracts, caching strategy and observability.",
  },
];

const DEFAULT_STATS = [
  { value: 5, suffix: "+", label: "Years building" },
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "", label: "Countries worked" },
  { value: 8, suffix: "+", label: "Stacks in practice" },
];

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  const bio =
    profile?.bio ??
    "I build across backend, mobile and web — from high-scale connected products to polished interfaces — applying a competitive-programming mindset to design, delivery and outcomes.";

  // Keep the scroll-lit statement to a readable length (first sentences)
  const statement = (bio.match(/[^.!?]+[.!?]+/g) ?? [bio])
    .reduce<string[]>(
      (acc, sent) =>
        acc.join("").length + sent.length <= 220 || acc.length === 0
          ? [...acc, sent]
          : acc,
      [],
    )
    .join("")
    .trim();

  const portrait: FlowMediaItem = {
    ...FLOW_MEDIA.blueMountains,
    id: "portrait",
    theme: "landmark",
    title: profile?.name ?? "Ricky Chen",
    subtitle: profile?.title ?? "Fullstack & AI Engineer",
    caption: profile?.location ?? "Sydney, Australia",
    alt: `Portrait of ${profile?.name ?? "Ricky Chen"}`,
  };

  const numericStats = (profile?.stats ?? [])
    .map((s) => ({
      value: Number(s.value),
      suffix: s.unit ?? "",
      label: s.label,
    }))
    .filter((s) => Number.isFinite(s.value))
    .slice(0, 4);
  const stats = numericStats.length >= 2 ? numericStats : DEFAULT_STATS;

  return (
    <Section
      id="about"
      index="01"
      label="Practice"
      meta="Sydney · Gadigal Country"
      stack
    >
      <ScrollWords text={statement} className={styles.statement} />

      <div className={styles.grid}>
        <div className={styles.portraitCol}>
          <RevealMedia
            item={portrait}
            srcOverride={
              profile?.avatarUrl ?? "/images/ricky-chen-portrait.png"
            }
            frameClassName={styles.portraitFrame}
            parallax={10}
            caption
            plate="P.01"
          />
        </div>

        <div className={styles.textCol}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["A practice built", <em key="e">on structure.</em>]}
          />
          <ol className={styles.disciplines}>
            {DISCIPLINES.map((d, i) => (
              <motion.li
                key={d.title}
                className={styles.discipline}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
              >
                <span className={styles.discIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.discTitle}>{d.title}</h3>
                  <p className={styles.discDesc}>{d.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <RevealMedia
        item={FLOW_MEDIA.blueMountains}
        frameClassName={styles.wideFrame}
        parallax={18}
        from="left"
        caption
        plate="P.02"
        className={styles.wide}
      />

      <div className={styles.stats}>
        {stats.map((s) => (
          <CountUp
            key={s.label}
            target={s.value}
            suffix={s.suffix}
            label={s.label}
          />
        ))}
      </div>
    </Section>
  );
};
