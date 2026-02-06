/**
 * Contact Page - Contact form and social links
 * Version 2: Uses ProfileContext
 */

import React, { useState, FormEvent } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSEO } from "@/hooks/useSEO";
import { contactService } from "@/services/ContactService";
import { validateContactForm } from "@/utils/formValidation";
import { trackEvent } from "@/utils/analytics";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Card } from "@/views/components/ui/Card";
import { Loading } from "@/views/components/ui/Loading";
import { PageError } from "@/views/components/ui/PageError";
import type { Contact as ContactType } from "@/types/domain";
import styles from "./Contact.module.css";

export const Contact: React.FC = () => {
  const { profile, isLoading, error, refetch } = useProfile();
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
      ? `${profile.name} - Contact | Portfolio`
      : "Contact | Ricky Chen Portfolio",
    description: "Get in touch: contact form, email, and social links.",
    keywords: "contact, get in touch, hire, software engineer",
    type: "website",
  });

  const getContactIcon = (type: ContactType["type"]): string => {
    const icons: Record<ContactType["type"], string> = {
      email: "✉️",
      phone: "📞",
      linkedin: "💼",
      github: "💻",
      website: "🌐",
      other: "🔗",
    };
    return icons[type] || "🔗";
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const validation = validateContactForm(formData);
    if (validation.errors[field]) {
      setFormErrors({ ...formErrors, [field]: validation.errors[field] });
    } else {
      const newErrors = { ...formErrors };
      delete newErrors[field];
      setFormErrors(newErrors);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (formErrors[field] && touched[field]) {
      const newErrors = { ...formErrors };
      delete newErrors[field];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
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
      setFormErrors({});
      trackEvent("contact_submit");
    } catch (error) {
      setSubmitStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "I couldn't send your message. Please try again in a moment or use the primary contact above.";
      setFormErrors({ submit: errorMessage });
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

  const primaryContact = profile.getPrimaryContact();
  const contacts = profile.contacts.filter((c) => !c.isPrimary);

  return (
    <Section
      title="Get In Touch"
      subtitle="Let's connect and discuss opportunities"
      variant="alt"
    >
      <ScrollReveal direction="up" delay={0}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <Card variant="elevated" className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <Typography
                  variant="h4"
                  weight="semibold"
                  className={styles.cardTitle}
                >
                  Contact Information
                </Typography>
              </div>

              <>
                {primaryContact && (
                  <div className={styles.contactItem}>
                    <Typography variant="body" weight="medium">
                      {getContactIcon(primaryContact.type)}{" "}
                      {primaryContact.label}
                    </Typography>
                    <a
                      href={
                        primaryContact.type === "email"
                          ? `mailto:${primaryContact.value}`
                          : primaryContact.type === "phone"
                            ? `tel:${primaryContact.value}`
                            : primaryContact.value
                      }
                      target={
                        primaryContact.type === "email" ||
                        primaryContact.type === "phone"
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        primaryContact.type === "email" ||
                        primaryContact.type === "phone"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className={styles.contactLink}
                    >
                      {primaryContact.value}
                    </a>
                  </div>
                )}
                {contacts.length > 0 && (
                  <div className={styles.socialLinks}>
                    {contacts.map((contact) => {
                      const href =
                        contact.type === "email"
                          ? `mailto:${contact.value}`
                          : contact.type === "phone"
                            ? `tel:${contact.value}`
                            : contact.value;

                      return (
                        <a
                          key={contact.id}
                          href={href}
                          target={
                            contact.type === "email" || contact.type === "phone"
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            contact.type === "email" || contact.type === "phone"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className={styles.socialLink}
                        >
                          <span aria-hidden="true">
                            {getContactIcon(contact.type)}{" "}
                          </span>
                          {contact.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            </Card>
          </div>

          <div className={styles.formContainer}>
            <Card variant="elevated" className={styles.formCard}>
              <Typography
                variant="h4"
                weight="semibold"
                className={styles.cardTitle}
              >
                Send a Message
              </Typography>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className={styles.form}
                aria-label="Contact form"
                noValidate
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    Name <span aria-label="required">*</span>
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
                    className={formErrors.name ? styles.inputError : ""}
                  />
                  {formErrors.name && touched.name && (
                    <span
                      id="name-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.name}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    Email <span aria-label="required">*</span>
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
                    className={formErrors.email ? styles.inputError : ""}
                  />
                  {formErrors.email && touched.email && (
                    <span
                      id="email-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">
                    Message <span aria-label="required">*</span>
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
                    className={formErrors.message ? styles.inputError : ""}
                  />
                  {formErrors.message && touched.message && (
                    <span
                      id="message-error"
                      className={styles.errorText}
                      role="alert"
                    >
                      {formErrors.message}
                    </span>
                  )}
                </div>
                {submitStatus === "success" && (
                  <div
                    className={styles.successMessage}
                    role="alert"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    ✓ Message sent successfully! I&apos;ll get back to you as
                    soon as possible.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div
                    className={styles.errorMessage}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                  >
                    ✗{" "}
                    {formErrors.submit ||
                      "I couldn't send your message. Please try again or reach me via the primary contact above."}
                  </div>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
};
