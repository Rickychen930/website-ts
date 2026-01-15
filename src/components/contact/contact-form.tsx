/**
 * Contact Form Component
 * Professional contact form dengan validation
 * Enhanced with DOMPurify for XSS protection
 */

import React, { Component, ReactNode, FormEvent, ChangeEvent } from "react";
import DOMPurify from "dompurify";
import { toast } from "../../views/components/ui";
import { trackContactFormSubmission } from "../../utils/analytics";
import "../../assets/css/contact-form.css";

interface ContactFormState {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  errors: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export class ContactForm extends Component<{}, ContactFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
    };
  }

  private validateEmail = (email: string): boolean => {
    // Edge case: Trim whitespace before validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return false;

    // More comprehensive email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(trimmedEmail);
  };

  private validate = (): boolean => {
    const { formData } = this.state;
    const errors: ContactFormState["errors"] = {};

    // Name validation with edge cases
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters";
    } else if (trimmedName.length > 100) {
      errors.name = "Name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      errors.name =
        "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Email validation with edge cases
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errors.email = "Email is required";
    } else if (trimmedEmail.length > 254) {
      errors.email = "Email address is too long";
    } else if (!this.validateEmail(trimmedEmail)) {
      errors.email = "Please enter a valid email address";
    }

    // Subject validation with edge cases
    const trimmedSubject = formData.subject.trim();
    if (!trimmedSubject) {
      errors.subject = "Subject is required";
    } else if (trimmedSubject.length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    } else if (trimmedSubject.length > 200) {
      errors.subject = "Subject must be less than 200 characters";
    }

    // Message validation with edge cases
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      errors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (trimmedMessage.length > 5000) {
      errors.message = "Message must be less than 5000 characters";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  private handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    // Edge case: Prevent XSS by sanitizing input with DOMPurify
    // DOMPurify removes all HTML tags and dangerous content
    const sanitizedValue = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // No HTML tags allowed
      ALLOWED_ATTR: [], // No attributes allowed
    });

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: sanitizedValue,
      },
      // Clear error when user starts typing
      errors: {
        ...prevState.errors,
        [name]: undefined,
      },
    }));
  };

  private handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    // Edge case: Prevent double submission
    if (this.state.isSubmitting) {
      return;
    }

    if (!this.validate()) {
      toast.error("Please fix the errors in the form");
      // Focus first error field for better UX
      const firstErrorField = Object.keys(this.state.errors)[0];
      if (firstErrorField) {
        const errorElement = document.getElementById(
          `contact-${firstErrorField}`,
        );
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      // Simulate API call (replace with actual API endpoint)
      await this.submitForm(this.state.formData);

      this.setState({
        isSubmitted: true,
        isSubmitting: false,
        formData: {
          name: "",
          email: "",
          subject: "",
          message: "",
        },
        errors: {},
      });

      toast.success("Message sent successfully! I'll get back to you soon.");

      // Track successful submission
      trackContactFormSubmission(true);
    } catch (error) {
      this.setState({ isSubmitting: false });
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.";
      toast.error(errorMessage);

      // Track failed submission
      trackContactFormSubmission(false);
      // Log error for debugging (only in development)
      if (process.env.NODE_ENV === "development") {
        const { logError } = require("../../utils/logger");
        logError("Form submission error", error, "ContactForm");
      }
    }
  };

  private submitForm = async (
    data: ContactFormState["formData"],
  ): Promise<void> => {
    // Get API URL with fallback options
    let apiUrl = process.env.REACT_APP_API_URL || "";

    // Fallback: If no API URL is set, try to use current origin
    if (!apiUrl) {
      if (typeof window !== "undefined") {
        // In browser, use current origin
        apiUrl = window.location.origin;
      } else {
        // Fallback for SSR or development
        apiUrl = "http://localhost:4000";
      }
    }

    // Remove trailing slash from API URL
    apiUrl = apiUrl.replace(/\/$/, "");

    const endpoint = `${apiUrl}/api/contact`;

    // Edge case: Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      // Log API endpoint in development for debugging
      if (process.env.NODE_ENV === "development") {
        console.log("[ContactForm] Submitting to:", endpoint);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        credentials: "include", // Include cookies for CORS
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `Server error: ${response.status}`,
        }));

        // Better error messages based on status code
        let errorMessage =
          errorData.error ||
          `HTTP ${response.status}: Failed to submit contact form`;

        if (response.status === 400) {
          errorMessage =
            errorData.error || "Please check your form data and try again.";
        } else if (response.status === 429) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }

        throw new Error(errorMessage);
      }

      const result = await response.json().catch(() => ({ success: true }));
      if (!result.success) {
        throw new Error(result.error || "Failed to submit contact form");
      }
    } catch (error) {
      clearTimeout(timeoutId);

      // Edge case: Handle network errors and timeouts
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error(
            "Request timeout. Please check your connection and try again.",
          );
        }
        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError") ||
          error.message.includes("CORS")
        ) {
          throw new Error(
            "Unable to connect to server. Please check your connection and try again.",
          );
        }
        throw error;
      }
      throw new Error("An unexpected error occurred. Please try again.");
    }
  };

  private handleReset = (): void => {
    this.setState({
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      errors: {},
      isSubmitted: false,
    });
  };

  render(): ReactNode {
    const { formData, errors, isSubmitting, isSubmitted } = this.state;

    if (isSubmitted) {
      return (
        <div className="contact-form-success">
          <div className="contact-form-success-icon">✓</div>
          <h3 className="contact-form-success-title">Message Sent!</h3>
          <p className="contact-form-success-message">
            Thank you for your message. I'll get back to you as soon as
            possible.
          </p>
          <button
            className="contact-form-reset-button"
            onClick={this.handleReset}
            type="button"
          >
            Send Another Message
          </button>
        </div>
      );
    }

    return (
      <form className="contact-form" onSubmit={this.handleSubmit} noValidate>
        <div className="contact-form-group">
          <label htmlFor="contact-name" className="contact-form-label">
            Name <span className="required">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={this.handleChange}
            className={`contact-form-input ${errors.name ? "error" : ""}`}
            placeholder="Your name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="contact-form-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="contact-form-group">
          <label htmlFor="contact-email" className="contact-form-label">
            Email <span className="required">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={this.handleChange}
            className={`contact-form-input ${errors.email ? "error" : ""}`}
            placeholder="your.email@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="contact-form-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="contact-form-group">
          <label htmlFor="contact-subject" className="contact-form-label">
            Subject <span className="required">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={this.handleChange}
            className={`contact-form-input ${errors.subject ? "error" : ""}`}
            placeholder="What's this about?"
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <span
              id="subject-error"
              className="contact-form-error"
              role="alert"
            >
              {errors.subject}
            </span>
          )}
        </div>

        <div className="contact-form-group">
          <label htmlFor="contact-message" className="contact-form-label">
            Message <span className="required">*</span>
            <span className="contact-form-char-count">
              {formData.message.length}/5000
            </span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={this.handleChange}
            className={`contact-form-textarea ${errors.message ? "error" : ""} ${formData.message.length > 4500 ? "warning" : ""}`}
            placeholder="Your message..."
            rows={6}
            maxLength={5000}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
          />
          <div id="message-hint" className="contact-form-hint">
            Minimum 10 characters required
          </div>
          {errors.message && (
            <span
              id="message-error"
              className="contact-form-error"
              role="alert"
            >
              {errors.message}
            </span>
          )}
        </div>

        <div className="contact-form-actions">
          <button
            type="submit"
            className="contact-form-submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="contact-form-spinner"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
