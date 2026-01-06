/**
 * Contact Form Component
 * Professional contact form dengan validation
 */

import React, { Component, ReactNode, FormEvent, ChangeEvent } from "react";
import { toast } from "../../views/components/ui";
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  private validate = (): boolean => {
    const { formData } = this.state;
    const errors: ContactFormState["errors"] = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  private handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
      // Clear error when user starts typing
      errors: {
        ...prevState.errors,
        [name]: undefined,
      },
    }));
  };

  private handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!this.validate()) {
      toast.error("Please fix the errors in the form");
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
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      this.setState({ isSubmitting: false });
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again later.";
      toast.error(errorMessage);
      // Log error for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        const { logError } = require('../../utils/logger');
        logError("Form submission error", error, "ContactForm");
      }
    }
  };

  private submitForm = async (data: ContactFormState["formData"]): Promise<void> => {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const endpoint = `${apiUrl}/api/contact`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to submit' }));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to submit contact form`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to submit contact form');
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
            Thank you for your message. I'll get back to you as soon as possible.
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
            <span id="subject-error" className="contact-form-error" role="alert">
              {errors.subject}
            </span>
          )}
        </div>

        <div className="contact-form-group">
          <label htmlFor="contact-message" className="contact-form-label">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={this.handleChange}
            className={`contact-form-textarea ${errors.message ? "error" : ""}`}
            placeholder="Your message..."
            rows={6}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className="contact-form-error" role="alert">
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
                <span className="contact-form-spinner" aria-hidden="true"></span>
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

