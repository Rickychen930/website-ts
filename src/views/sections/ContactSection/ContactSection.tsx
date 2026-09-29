import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "@/lib/motion";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { Button } from "@/components/ui/Button/Button";
import { FLOW_MEDIA } from "@/config/flowMedia";
import { contactService } from "@/services/ContactService";
import { useProfile } from "@/contexts";
import { WORK_RIGHTS } from "@/config/site-defaults";
import styles from "./ContactSection.module.css";

const BG = FLOW_MEDIA.harbourNight;

type Status = "idle" | "sending" | "sent" | "error";

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  // Framed plate expands to full-bleed as the section scrolls in
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(12% 10% 12% 10%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const email =
    profile?.contacts?.find((c) => c.type === "email")?.value ??
    "rickychen930@gmail.com";
  const socials = (profile?.contacts ?? []).filter((c) =>
    ["github", "linkedin", "website"].includes(c.type),
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await contactService.submitContactForm(form);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={styles.section}
      aria-label="Contact"
      data-section="contact"
    >
      <motion.div
        className={styles.bg}
        style={reduce ? undefined : { clipPath }}
        aria-hidden="true"
      >
        <motion.div
          className={styles.bgInner}
          style={reduce ? undefined : { scale }}
        >
          <FlowMedia item={BG} showPendingLabel={false} />
        </motion.div>
        <div className={styles.scrim} />
      </motion.div>

      <div className={styles.inner}>
        <div className={styles.panel}>
          <span className={`eyebrow ${styles.eyebrow}`}>Contact</span>

          <RevealText
            as="h2"
            className={styles.heading}
            lines={["Let’s build something", <em key="s">worth visiting.</em>]}
          />

          <p className={styles.sub}>
            Open to software engineering, AI and full-stack roles in Sydney or
            remote — and to freelance projects.
          </p>
          <p className={styles.rights}>{WORK_RIGHTS.detail}</p>

          <button
            type="button"
            className={styles.email}
            onClick={copyEmail}
            aria-label={`Copy email address ${email}`}
          >
            <span className={styles.emailText}>{email}</span>
            <span className={styles.emailHint} aria-live="polite">
              {copied ? "Copied ✓" : "Copy"}
            </span>
          </button>

          <div className={styles.actions}>
            <Button as="a" href={`mailto:${email}`} variant="inverse">
              Write an email ↗
            </Button>
            <Button
              variant="outlineInverse"
              onClick={() => setFormOpen((v) => !v)}
              aria-expanded={formOpen}
              aria-controls="contact-form"
            >
              {formOpen ? "Close form" : "Leave a message"}
            </Button>
            <ul className={styles.socials}>
              {socials.map((c) => (
                <li key={c.id}>
                  <a href={c.value} target="_blank" rel="noopener noreferrer">
                    {c.label || c.type} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence>
            {formOpen && (
              <motion.form
                id="contact-form"
                className={styles.form}
                onSubmit={submit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {status === "sent" ? (
                  <p className={styles.success} role="status">
                    Message received — I’ll reply soon.
                  </p>
                ) : (
                  <div className={styles.fields}>
                    <label className={styles.field}>
                      <span>Name</span>
                      <input
                        type="text"
                        value={form.name}
                        autoComplete="name"
                        maxLength={100}
                        required
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Email</span>
                      <input
                        type="email"
                        value={form.email}
                        autoComplete="email"
                        maxLength={200}
                        required
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </label>
                    <label className={`${styles.field} ${styles.fieldWide}`}>
                      <span>Message</span>
                      <textarea
                        rows={4}
                        value={form.message}
                        maxLength={2000}
                        required
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                      />
                    </label>
                    <div className={styles.formFoot}>
                      {status === "error" && (
                        <p className={styles.error} role="alert">
                          Something went wrong — please email directly.
                        </p>
                      )}
                      <Button
                        type="submit"
                        variant="inverse"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? "Sending…" : "Send message →"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
