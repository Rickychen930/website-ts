import React from "react";
import { motion } from "@/lib/motion";
import { Section } from "@/components/layout/Section/Section";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { useProfile } from "@/contexts";
import styles from "./CredentialsSection.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const year = (d?: string) => {
  const y = d ? new Date(d).getFullYear() : NaN;
  return Number.isFinite(y) ? String(y) : "";
};

type HonorKind = "award" | "publication" | "leadership";

const kindOf = (issuer: string, title: string): HonorKind => {
  if (/publication/i.test(issuer)) return "publication";
  if (/leader|mentor|partner/i.test(title)) return "leadership";
  return "award";
};

const ICONS: Record<HonorKind, string> = {
  award:
    "M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 3M17 6h3a3 3 0 0 1-3 3",
  publication: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 0 2 2h12M8 7h6M8 11h6",
  leadership:
    "M16 11a4 4 0 1 0-8 0M3 21a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6M19 8a3 3 0 0 1 0 6M5 8a3 3 0 0 0 0 6",
};

const LEVEL_LABEL: Record<string, string> = {
  native: "Native",
  fluent: "Fluent",
  professional: "Professional working",
  conversational: "Conversational",
  basic: "Basic",
};

/** "Current GPA: 6.63/7.00. …" → { score: "6.63", scale: "7" } */
const parseGpa = (text?: string) => {
  const m = text?.match(/GPA:\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/i);
  return m ? { score: m[1], scale: String(Number(m[2])) } : null;
};

const stripGpa = (text?: string) =>
  text?.replace(/(Current\s+)?GPA:\s*\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?\.?\s*/i, "").trim();

const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
});

/** Education, honours and certifications — the proof points recruiters scan for */
export const CredentialsSection: React.FC = () => {
  const { profile } = useProfile();
  const academics = profile?.academics ?? [];
  const honors = profile?.honors ?? [];
  const certs = profile?.certifications ?? [];
  const languages = profile?.languages ?? [];
  if (!academics.length && !honors.length) return null;

  return (
    <Section id="credentials" label="Credentials">
      <div className={styles.head}>
        <RevealText
          as="h2"
          className={styles.heading}
          lines={["Education &", <em key="r">recognition.</em>]}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.main}>
        <div className={styles.education}>
          {academics.map((a, i) => {
            const gpa = parseGpa(a.description);
            const inProgress = !a.endDate || new Date(a.endDate) > new Date();
            return (
              <motion.article
                key={a.id}
                className={styles.eduCard}
                data-spotlight=""
                {...rise(i)}
              >
                <div className={styles.eduTop}>
                  <span className={styles.years}>
                    {year(a.startDate)} — {inProgress ? "Present" : year(a.endDate)}
                  </span>
                  {inProgress && <span className={styles.badge}>In progress</span>}
                </div>
                <h3 className={styles.degree}>{a.degree}</h3>
                <p className={styles.school}>{a.institution}</p>
                {gpa && (
                  <p className={styles.gpa}>
                    <span className={styles.gpaScore}>{gpa.score}</span>
                    <span className={styles.gpaScale}>
                      / {gpa.scale} GPA
                    </span>
                  </p>
                )}
                {stripGpa(a.description) && (
                  <p className={styles.eduDesc}>{stripGpa(a.description)}</p>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className={styles.extras}>
          {languages.length > 0 && (
            <div>
              <h3 className={styles.sideTitle}>Languages</h3>
              <ul className={styles.certs}>
                {languages.map((l) => (
                  <li key={l.id} className={styles.cert}>
                    <span className={styles.certName}>{l.name}</span>
                    <span className={styles.certMeta}>
                      {LEVEL_LABEL[l.proficiency] ?? l.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certs.length > 0 && (
            <div>
              <h3 className={styles.sideTitle}>Certifications</h3>
              <ul className={styles.certs}>
                {certs.map((c) => (
                  <li key={c.id} className={styles.cert}>
                    <span className={styles.certName}>{c.name}</span>
                    <span className={styles.certMeta}>
                      {c.issuer} · {year(c.issueDate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>

        <div className={styles.side}>
          {honors.length > 0 && (
            <div>
              <h3 className={styles.sideTitle}>Honours & leadership</h3>
              <ul className={styles.honors}>
                {honors.map((h, i) => (
                  <motion.li key={h.id} className={styles.honor} {...rise(i)}>
                    <span className={styles.trophy} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path
                          d={ICONS[kindOf(h.issuer, h.title)]}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className={styles.honorTitle}>
                        {h.url ? (
                          <a href={h.url} target="_blank" rel="noopener noreferrer">
                            {h.title} ↗
                          </a>
                        ) : (
                          h.title
                        )}
                      </p>
                      <p className={styles.honorMeta}>
                        {[h.issuer, year(h.date)].filter(Boolean).join(" · ")}
                      </p>
                      {h.description && (
                        <p className={styles.honorDesc}>{h.description}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </Section>
  );
};
