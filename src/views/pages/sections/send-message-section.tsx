/**
 * Send Message Section Component
 * View Layer (MVC Pattern)
 *
 * Architecture:
 * - MVC: Strict separation of View, Controller, and Model
 * - View: Only handles UI rendering and user interactions
 * - Component-Based: Uses reusable ContactForm component
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): View only renders UI
 * - Open/Closed Principle (OCP): Extensible via composition
 * - DRY: Uses reusable components
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 *
 * Features:
 * - Clean separation of concerns
 * - Professional, luxury, beautiful UI
 * - Fully accessible (ARIA labels, keyboard navigation)
 * - Responsive design
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import ContactForm from "../../../components/contact/contact-form";
import "../../../assets/css/contact-form.css";
import "../../../assets/css/send-message-section.css";

/**
 * Send Message Section Props Interface
 */
type SendMessageSectionProps = {
  data?: unknown; // Not used, but kept for consistency with other sections
};

/**
 * Send Message Section Component
 * Main view component following MVC pattern
 */
class SendMessageSection extends Component<SendMessageSectionProps> {
  /**
   * Main render method
   */
  public render(): ReactNode {
    return (
      <Card id="send-message" title="Send me a message">
        <div className="send-message-wrapper">
          <p className="send-message-subtitle">
            Have a question or want to work together? Feel free to reach out!
          </p>
          <ContactForm />
        </div>
      </Card>
    );
  }
}

export default SendMessageSection;
export type { SendMessageSectionProps };
