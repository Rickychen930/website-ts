import React from "react";
import { useProfile } from "@/contexts";
import styles from "./Footer.module.css";

const INDEX_LINKS = [
  { href: "/#about", label: "Practice" },
  { href: "/projects", label: "All works" },
  { href: "/#work", label: "Chronology" },
  { href: "/#atlas", label: "Field atlas" },
  { href: "/resume", label: "Résumé" },
];

export const Footer: React.FC = () => {
  const { profile } = useProfile();
  const socials = (profile?.contacts ?? []).filter((c) =>
    ["github", "linkedin"].includes(c.type),
  );
  const email =
    profile?.contacts?.find((c) => c.type === "email")?.value ??
    "rickychen930@gmail.com";

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <span className="label">Index</span>
            {INDEX_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
          </div>
          <div className={styles.col}>
            <span className="label">Elsewhere</span>
            <a href={`mailto:${email}`} className={styles.link}>
              Email
            </a>
            {socials.map((c) => (
              <a
                key={c.id}
                href={c.value}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {c.label || c.type} ↗
              </a>
            ))}
          </div>
          <div className={styles.col}>
            <span className="label">Studio</span>
            <p className={styles.text}>
              Sydney, New South Wales
              <br />
              33.8688° S, 151.2093° E
            </p>
          </div>
          <div className={styles.col}>
            <span className="label">Acknowledgement</span>
            <p className={styles.text}>
              I acknowledge the Gadigal people of the Eora Nation, the
              Traditional Custodians of the land on which this work is made, and
              pay my respects to Elders past and present.
            </p>
          </div>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          Ricky Chen
        </p>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Ricky Chen</span>
          <span>Built with React · TypeScript</span>
        </div>
      </div>
    </footer>
  );
};
