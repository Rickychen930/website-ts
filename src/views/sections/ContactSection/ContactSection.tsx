import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "@/lib/motion";
import { FadeUp } from "@/components/motion/FadeUp/FadeUp";
import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/layout/Section/Section";
import { useProfile } from "@/contexts";
import styles from "./ContactSection.module.css";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M20 6L9 17l-5-5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const shouldReduce = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const [copyState, setCopyState] = useState<"idle" | "hover" | "copied">(
    "idle",
  );
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const emailContact = profile?.contacts?.find((c) => c.type === "email");
  const email = emailContact?.value ?? "rickychen930@gmail.com";
  const github = profile?.contacts?.find((c) => c.type === "github");
  const linkedin = profile?.contacts?.find((c) => c.type === "linkedin");

  useEffect(() => {
    if (shouldReduce) return;
    const el = bgRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [shouldReduce]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <Section id="contact" sectionNumber="05" data-section="contact">
      <div className={styles.meshBg} ref={bgRef} aria-hidden="true" />

      <div className={styles.content}>
        <FadeUp>
          <span className={styles.sectionLabel}>Contact</span>
          <h2 className={styles.heading}>
            Let's build
            <br />
            <span className="gradient-text">something.</span>
          </h2>
          <p className={styles.sub}>
            Open to fullstack, AI engineering, and freelance work.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className={styles.emailWrap}
            data-cursor="copy"
            onMouseEnter={() => setCopyState("hover")}
            onMouseLeave={() => copyState !== "copied" && setCopyState("idle")}
            onClick={handleCopy}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCopy()}
            aria-label={`Email: ${email}. Click to copy.`}
          >
            <span className={styles.emailAddress}>{email}</span>
            <AnimatePresence mode="wait">
              {copyState === "copied" ? (
                <motion.span
                  key="copied"
                  className={styles.copyLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{ color: "var(--accent-2)" }}
                  aria-live="polite"
                >
                  <CheckIcon /> Copied!
                </motion.span>
              ) : copyState === "hover" ? (
                <motion.span
                  key="hover"
                  className={styles.copyLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  Click to copy
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className={styles.divider} />
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className={styles.socials}>
            {github && (
              <a
                href={github.value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialLink}
                data-cursor="open"
              >
                <GitHubIcon />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin.value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialLink}
                data-cursor="open"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <Button variant="ghost" onClick={() => setFormOpen((v) => !v)}>
            {formOpen ? "Close" : "Or send a message →"}
          </Button>
        </FadeUp>

        <AnimatePresence>
          {formOpen && (
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={styles.formInner}>
                {formStatus === "sent" ? (
                  <motion.p
                    className={styles.success}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Message sent! I'll get back to you soon.
                  </motion.p>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Your name"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, name: e.target.value }))
                      }
                      required
                    />
                    <textarea
                      placeholder="Your message"
                      className={styles.textarea}
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, message: e.target.value }))
                      }
                      required
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? "Sending…" : "Send message"}
                    </Button>
                    {formStatus === "error" && (
                      <p className={styles.error}>
                        Something went wrong. Try emailing directly.
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};
