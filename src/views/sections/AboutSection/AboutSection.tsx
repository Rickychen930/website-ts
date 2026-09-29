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

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DISCIPLINES = [
  {
    title: "AI applications",
    desc: "Production LLM chatbots and summarisation — structured prompts, validated output.",
    tools: ["Python", "LLM APIs", "Prompt engineering", "TensorFlow"],
    icon: "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  },
  {
    title: "Full-stack platforms",
    desc: "Responsive web apps with clean APIs and reusable UI.",
    tools: ["React", "TypeScript", "Node.js", "MongoDB"],
    icon: "M3 5h18v11H3zM8 21h8M12 16v5M7 9l2 2-2 2M11 13h4",
  },
  {
    title: "Production engineering",
    desc: "Design to release — architecture, testing and code review.",
    tools: ["Git", "CI/CD", "Agile", "SOLID"],
    icon: "M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4",
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
    <Section id="about" label="About" stack>
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
          />
        </div>

        <div className={styles.textCol}>
          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Engineering", <em key="e">that ships.</em>]}
          />
          <ol className={styles.disciplines}>
            {DISCIPLINES.map((d, i) => (
              <motion.li
                key={d.title}
                className={styles.discipline}
                data-spotlight=""
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
              >
                <span className={styles.discIcon}>
                  <Icon d={d.icon} />
                </span>
                <div>
                  <h3 className={styles.discTitle}>{d.title}</h3>
                  <p className={styles.discDesc}>{d.desc}</p>
                  <ul className={styles.tools} aria-label="Tools">
                    {d.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
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
