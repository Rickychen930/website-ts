import React from "react";
import { useProfile } from "@/contexts";
import { WORK_RIGHTS } from "@/config/site-defaults";
import styles from "./Footer.module.css";

const INDEX_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#work", label: "Experience" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#stack", label: "Skills" },
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
            <span className="label">Explore</span>
            {INDEX_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
          </div>
          <div className={styles.col}>
            <span className="label">Connect</span>
            <a href={`mailto:${email}`} className={styles.link}>
              Email
            </a>
            <a
              href="/Ricky-Chen-Resume-2026.pdf"
              download="Ricky-Chen-Resume.pdf"
              className={styles.link}
            >
              Download CV
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
            <span className="label">Location</span>
            <p className={styles.text}>
              Sydney, NSW, Australia
              <br />
              Open to on-site, hybrid or remote
              <br />
              {WORK_RIGHTS.short}
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
