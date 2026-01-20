/**
 * Contact Page - Contact form and social links
 * Version 2: Uses ProfileContext
 */

import React, { useState, FormEvent } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { contactService } from "@/services/ContactService";
import { profileService } from "@/services/ProfileService";
import { validateContactForm } from "@/utils/formValidation";
import { Section } from "@/views/components/layout/Section";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import { Card } from "@/views/components/ui/Card";
import { Loading } from "@/views/components/ui/Loading";
import type { Contact as ContactType } from "@/types/domain";
import styles from "./Contact.module.css";

export const Contact: React.FC = () => {
  const { profile, isLoading, error, loadProfile } = useProfile();
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [editingContacts, setEditingContacts] = useState<ContactType[]>([]);
  const [contactUpdateErrors, setContactUpdateErrors] = useState<
    Record<string, string>
  >({});
  const [isUpdatingContacts, setIsUpdatingContacts] = useState(false);
  const [contactUpdateStatus, setContactUpdateStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
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

  const handleEditContacts = () => {
    if (profile) {
      setEditingContacts([...profile.contacts]);
      setIsEditingContacts(true);
      setContactUpdateStatus("idle");
      setContactUpdateErrors({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditingContacts(false);
    setEditingContacts([]);
    setContactUpdateErrors({});
    setContactUpdateStatus("idle");
  };

  const handleContactChange = (
    index: number,
    field: keyof ContactType,
    value: string | boolean,
  ) => {
    const updated = [...editingContacts];
    updated[index] = { ...updated[index], [field]: value };
    setEditingContacts(updated);
    // Clear error for this field
    if (contactUpdateErrors[`${index}-${field}`]) {
      const newErrors = { ...contactUpdateErrors };
      delete newErrors[`${index}-${field}`];
      setContactUpdateErrors(newErrors);
    }
  };

  const handleSaveContacts = async () => {
    // Validate contacts
    const errors: Record<string, string> = {};
    let hasPrimary = false;

    editingContacts.forEach((contact, index) => {
      if (!contact.value.trim()) {
        errors[`${index}-value`] = "Value is required";
      }
      if (!contact.label.trim()) {
        errors[`${index}-label`] = "Label is required";
      }
      if (contact.isPrimary) {
        hasPrimary = true;
      }
    });

    if (!hasPrimary) {
      errors["primary"] = "At least one contact must be marked as primary";
    }

    if (Object.keys(errors).length > 0) {
      setContactUpdateErrors(errors);
      return;
    }

    setIsUpdatingContacts(true);
    setContactUpdateStatus("idle");
    setContactUpdateErrors({});

    try {
      await profileService.updateContacts(editingContacts);
      setContactUpdateStatus("success");
      setIsEditingContacts(false);
      // Reload profile to get updated data
      await loadProfile();
      // Clear success message after 3 seconds
      setTimeout(() => setContactUpdateStatus("idle"), 3000);
    } catch (error) {
      setContactUpdateStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update contact information";
      setContactUpdateErrors({ submit: errorMessage });
    } finally {
      setIsUpdatingContacts(false);
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
    } catch (error) {
      setSubmitStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
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
      <div className={styles.error} role="alert" aria-live="assertive">
        <Typography variant="h3">Failed to load contact information</Typography>
        <Typography variant="body" color="secondary">
          {error?.message || "Please try again later"}
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          className={styles.retryButton}
          aria-label="Retry loading contact information"
        >
          Retry
        </Button>
      </div>
    );
  }

  const primaryContact = profile.getPrimaryContact();
  const contacts = profile.contacts.filter((c) => !c.isPrimary);
  const displayContacts = isEditingContacts
    ? editingContacts
    : profile.contacts;

  return (
    <Section
      title="Get In Touch"
      subtitle="Let's connect and discuss opportunities"
    >
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
              {!isEditingContacts && (
                <Button
                  variant="secondary"
                  onClick={handleEditContacts}
                  aria-label="Edit contact information"
                >
                  Edit
                </Button>
              )}
            </div>

            {contactUpdateStatus === "success" && (
              <div
                className={styles.successMessage}
                role="alert"
                aria-live="polite"
              >
                ✓ Contact information updated successfully!
              </div>
            )}

            {contactUpdateStatus === "error" && contactUpdateErrors.submit && (
              <div
                className={styles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                ✗ {contactUpdateErrors.submit}
              </div>
            )}

            {contactUpdateErrors.primary && (
              <div
                className={styles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                ✗ {contactUpdateErrors.primary}
              </div>
            )}

            {isEditingContacts ? (
              <div className={styles.form}>
                {displayContacts.map((contact, index) => (
                  <div key={contact.id || index} className={styles.formGroup}>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor={`contact-type-${index}`}>
                          Type <span aria-label="required">*</span>
                        </label>
                        <select
                          id={`contact-type-${index}`}
                          value={contact.type}
                          onChange={(e) =>
                            handleContactChange(
                              index,
                              "type",
                              e.target.value as ContactType["type"],
                            )
                          }
                          className={`${styles.selectInput} ${
                            contactUpdateErrors[`${index}-type`]
                              ? styles.inputError
                              : ""
                          }`}
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="website">Website</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className={styles.formField}>
                        <label htmlFor={`contact-label-${index}`}>
                          Label <span aria-label="required">*</span>
                        </label>
                        <input
                          type="text"
                          id={`contact-label-${index}`}
                          value={contact.label}
                          onChange={(e) =>
                            handleContactChange(index, "label", e.target.value)
                          }
                          className={
                            contactUpdateErrors[`${index}-label`]
                              ? styles.inputError
                              : ""
                          }
                        />
                        {contactUpdateErrors[`${index}-label`] && (
                          <span className={styles.errorText}>
                            {contactUpdateErrors[`${index}-label`]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`contact-value-${index}`}>
                        Value <span aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id={`contact-value-${index}`}
                        value={contact.value}
                        onChange={(e) =>
                          handleContactChange(index, "value", e.target.value)
                        }
                        className={
                          contactUpdateErrors[`${index}-value`]
                            ? styles.inputError
                            : ""
                        }
                      />
                      {contactUpdateErrors[`${index}-value`] && (
                        <span className={styles.errorText}>
                          {contactUpdateErrors[`${index}-value`]}
                        </span>
                      )}
                    </div>
                    <div className={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        id={`contact-primary-${index}`}
                        checked={contact.isPrimary}
                        onChange={(e) =>
                          handleContactChange(
                            index,
                            "isPrimary",
                            e.target.checked,
                          )
                        }
                      />
                      <label
                        htmlFor={`contact-primary-${index}`}
                        className={styles.checkboxLabel}
                      >
                        Primary Contact
                      </label>
                    </div>
                  </div>
                ))}
                <div className={styles.formActions}>
                  <Button
                    variant="primary"
                    onClick={handleSaveContacts}
                    isLoading={isUpdatingContacts}
                    fullWidth
                  >
                    {isUpdatingContacts ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancelEdit}
                    fullWidth
                    disabled={isUpdatingContacts}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {primaryContact && (
                  <div className={styles.contactItem}>
                    <Typography variant="body" weight="medium">
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
                          {contact.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            )}
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
                  aria-describedby={formErrors.name ? "name-error" : undefined}
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
                  ✓ Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div
                  className={styles.errorMessage}
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  ✗ Failed to send message. Please try again.
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
    </Section>
  );
};
