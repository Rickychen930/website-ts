/**
 * Contact — direct channels and message form.
 */

import React, { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { contactService } from "@/services/ContactService";
import { validateContactForm } from "@/utils/formValidation";
import { trackEvent } from "@/utils/analytics";
import { sortChannelsForDisplay } from "@/utils/contactChannels";
import { PageHeroFx } from "@/components/PageHeroFx";
import { NexusSection } from "@/components/NexusSection";
import { ContactChannelsPanel } from "@/views/components/domain/ContactChannelsPanel";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { SplitText } from "@/components/SplitText/SplitText";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import { Button } from "@/views/components/ui/Button";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import {
  CONTACT_SEO_DESCRIPTION,
  SITE_BRAND_NAME,
} from "@/config/site-defaults";
import styles from "./Contact.module.css";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

export const Contact: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
  const reduced = useReducedMotion() ?? false;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useSEO({
    title: profile
      ? `${profile.name} — Contact`
      : `${SITE_BRAND_NAME} — Contact`,
    description: CONTACT_SEO_DESCRIPTION,
    keywords: "contact, get in touch, portfolio",
    type: "website",
  });

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const validation = validateContactForm(formData);
    if (validation.errors[field]) {
      setFormErrors({ ...formErrors, [field]: validation.errors[field] });
    } else {
      const next = { ...formErrors };
      delete next[field];
      setFormErrors(next);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field] && touched[field]) {
      const next = { ...formErrors };
      delete next[field];
      setFormErrors(next);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setFormErrors({});

    try {
      await contactService.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      trackEvent("contact_submit");
    } catch (err) {
      setSubmitStatus("error");
      setFormErrors({
        submit:
          err instanceof Error
            ? err.message
            : "I couldn't send your message. Please try again or use a direct channel.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen message="Loading contact information..." />;
  }

  if (error || !profile) {
    return (
      <PageError
        title="Failed to load contact information"
        message={error?.message || "Please try again later."}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );
  }

  const channels = sortChannelsForDisplay(profile.contacts);
  const openToWork = profile.openToOpportunities !== false;

  return (
    <motion.div
      className={`pf-page ${styles.contact}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="pf-hero" aria-labelledby="contact-hero-title">
        <div className="pf-hero-mesh" aria-hidden="true" />
        <PageHeroFx />
        <div className={`pf-hero-inner ${styles.heroInner}`}>
          <div className="pf-hero-main">
            <motion.div
              className={`pf-hero-copy ${styles.heroContent}`}
              {...fadeUp(reduced)}
            >
              <p className="pf-eyebrow">Contact</p>
              <h1 id="contact-hero-title" className="pf-hero-title">
                <SplitText text="Get in touch" stagger={0.03} />
              </h1>
              <p className={`pf-hero-lead ${styles.heroLead}`}>
                Hiring, internships, collaborations, or project inquiries —
                email, LinkedIn, or the form below. I usually reply within one
                to two business days.
              </p>
            </motion.div>

            <motion.ul
              className={`pf-hero-stats pf-hero-stats--three ${styles.heroStatsBar}`}
              aria-label="Contact overview"
              {...fadeUp(reduced, 0.08)}
            >
              <li>
                <TiltCard className={styles.statCard} maxTilt={8}>
                  <span className="pf-stat-value">{channels.length}</span>
                  <span className="pf-stat-label">Direct channels</span>
                </TiltCard>
              </li>
              {profile.location?.trim() ? (
                <li>
                  <TiltCard className={styles.statCard} maxTilt={8}>
                    <span className="pf-stat-value">Based in</span>
                    <span className="pf-stat-label">{profile.location}</span>
                  </TiltCard>
                </li>
              ) : null}
              <li>
                <TiltCard className={styles.statCard} maxTilt={8}>
                  <span className="pf-stat-value">
                    {openToWork ? "Open" : "Selective"}
                  </span>
                  <span className="pf-stat-label">Availability</span>
                </TiltCard>
              </li>
            </motion.ul>
          </div>
        </div>
      </header>

      <div className="pf-workspace">
        <div className="pf-workspace-inner">
          <NexusSection
            id="contact-workspace"
            eyebrow="Reach out"
            title={
              <>
                Direct <span className="nx-gradient-text">channels</span>
              </>
            }
            lead={
              profile.location?.trim()
                ? `Based in ${profile.location}. I reply within 1–2 business days.`
                : "I reply within 1–2 business days."
            }
            contentClassName={styles.layout}
          >
            <ContactChannelsPanel
              channels={channels}
              headingId="contact-channels-title"
              variant="embedded"
              hideHeader
              showQuickLinks
            />

            <motion.div className={styles.formPanel} {...fadeUp(reduced, 0.06)}>
              <h2 className={styles.formTitle}>Send a message</h2>
              <p className={styles.formLead}>
                Share a bit about your project or role — the more context, the
                better I can help.
              </p>

              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className={styles.form}
                aria-label="Contact form"
                noValidate
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    required
                    aria-required="true"
                    aria-invalid={formErrors.name ? "true" : "false"}
                    aria-describedby={
                      formErrors.name ? "name-error" : undefined
                    }
                    autoComplete="name"
                    placeholder="Your name"
                    className={formErrors.name ? styles.inputError : ""}
                  />
                  {formErrors.name && touched.name ? (
                    <span
                      id="name-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.name}
                    </span>
                  ) : null}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    required
                    aria-required="true"
                    aria-invalid={formErrors.email ? "true" : "false"}
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={formErrors.email ? styles.inputError : ""}
                  />
                  {formErrors.email && touched.email ? (
                    <span
                      id="email-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.email}
                    </span>
                  ) : null}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    required
                    aria-required="true"
                    aria-invalid={formErrors.message ? "true" : "false"}
                    aria-describedby={
                      formErrors.message ? "message-error" : undefined
                    }
                    placeholder="What are you building or hiring for?"
                    className={formErrors.message ? styles.inputError : ""}
                  />
                  {formErrors.message && touched.message ? (
                    <span
                      id="message-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.message}
                    </span>
                  ) : null}
                </div>

                {submitStatus === "success" ? (
                  <div
                    className={styles.successMessage}
                    role="alert"
                    aria-live="polite"
                  >
                    Message sent — I&apos;ll get back to you soon.
                  </div>
                ) : null}

                {submitStatus === "error" ? (
                  <div
                    className={styles.errorMessage}
                    role="alert"
                    aria-live="assertive"
                  >
                    {formErrors.submit ||
                      "Couldn't send your message. Please try again."}
                  </div>
                ) : null}

                <Magnetic strength={0.15}>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>
                </Magnetic>
              </form>
            </motion.div>
          </NexusSection>
        </div>
      </div>
    </motion.div>
  );
};
