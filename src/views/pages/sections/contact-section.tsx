/**
 * Contact Section Component
 * View Layer (MVC Pattern)
 * 
 * Architecture:
 * - MVC: Strict separation of View, Controller, and Model
 * - View: Only handles UI rendering and user interactions
 * - Controller: Handles all business logic (injected via DI)
 * - Model: Handles data structure and validation
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): View only renders UI
 * - Dependency Inversion Principle (DIP): Depends on Controller abstraction
 * - Open/Closed Principle (OCP): Extensible via composition
 * - DRY: Uses reusable components and centralized logic
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 * 
 * Features:
 * - Clean separation of concerns
 * - Proper error handling
 * - Performance optimized (lazy rendering, intersection observer)
 * - Fully accessible (ARIA labels, keyboard navigation)
 * - Responsive design
 * - Professional, luxury, beautiful UI
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { ContactController } from "../../../controllers/contact-controller";
import { IContact } from "../../../models/contact-model";
import { ContactGrid } from "../../components/contact";
import ContactForm from "../../../components/contact/contact-form";
import { safeSlice } from "../../../utils/view-helpers";
import "../../../assets/css/contact-section.css";

/**
 * Contact Section Props
 * Supports both old format (from UserProfile) and new format (IContact)
 */
type ContactSectionProps = {
  data: IContact[] | Array<{
    key: string;
    icon: string;
    label: string;
    value: string;
    link?: string;
  }>;
};

/**
 * Contact Section State
 * Encapsulates all view-related state
 */
type ContactSectionState = {
  error: string | null;
  processedData: IContact[];
  isLoading: boolean;
  copiedContact: string | null;
};

/**
 * Contact Section Component
 * Main view component following MVC pattern
 */
class ContactSection extends Component<ContactSectionProps, ContactSectionState> {
  private readonly controller: ContactController;
  private readonly MAX_ITEMS_TO_RENDER = 50;

  constructor(props: ContactSectionProps) {
    super(props);

    // Initialize controller (Dependency Injection)
    // This allows for easy testing and mocking
    this.controller = new ContactController();

    // Initialize state - data will be processed in componentDidMount
    this.state = {
      error: null,
      processedData: [],
      isLoading: false,
      copiedContact: null,
    };
  }

  /**
   * Component lifecycle - Mount
   * Process data on mount
   */
  componentDidMount(): void {
    this.processData();
  }

  /**
   * Normalize data to IContact format
   * Handles both old and new data formats
   */
  private normalizeData(
    data: ContactSectionProps["data"]
  ): IContact[] {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      value: item.value,
      link: item.link,
    }));
  }

  /**
   * Handle props update
   * Re-processes data when props change
   * Performance: Only processes when data actually changes
   */
  componentDidUpdate(prevProps: ContactSectionProps): void {
    if (prevProps.data !== this.props.data) {
      this.processData();
    }
  }

  /**
   * Process data through controller
   * Centralized data processing for better maintainability
   */
  private processData(): void {
    this.setState({ isLoading: true });

    // Normalize and process through controller
    const normalizedData = this.normalizeData(this.props.data);
    const processedData = this.controller.processData(normalizedData);

    // Validate through controller
    const validation = this.controller.validateData(normalizedData);

    this.setState({
      processedData,
      error: validation.isValid ? null : validation.error,
      isLoading: false,
      copiedContact: null,
    });
  }

  /**
   * Handle contact click
   */
  private handleContactClick = (contact: IContact): void => {
    this.controller.handleContactClick(contact);
  };

  /**
   * Handle copy click
   * Performance: Uses arrow function to maintain context
   */
  private handleCopyClick = async (contact: IContact): Promise<boolean> => {
    const success = await this.controller.copyToClipboard(contact);
    
    if (success) {
      this.setState({ copiedContact: contact.key });
      // Reset copied state after 2 seconds
      // Use window.setTimeout for better type safety
      window.setTimeout(() => {
        this.setState({ copiedContact: null });
      }, 2000);
    }

    return success;
  };

  /**
   * Validate data
   */
  private validateData(): { isValid: boolean; error: string | null } {
    const { data } = this.props;
    const normalizedData = this.normalizeData(data);
    const validation = this.controller.validateData(normalizedData);

    return {
      isValid: validation.isValid,
      error: validation.error,
    };
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div
        className="contact-section-empty"
        role="status"
        aria-live="polite"
        aria-label="No contact information available"
      >
        <div className="contact-section-empty-icon" aria-hidden="true">
          📭
        </div>
        <h3 className="contact-section-empty-title">No Contact Information</h3>
        <p className="contact-section-empty-message">
          Contact information will appear here once available.
        </p>
      </div>
    );
  }

  /**
   * Render error state
   */
  private renderErrorState(error: string): ReactNode {
    return (
      <div
        className="contact-section-error"
        role="alert"
        aria-label="Contact error"
      >
        <div className="contact-section-error-icon" aria-hidden="true">
          ⚠️
        </div>
        <h3 className="contact-section-error-title">Error Loading Contacts</h3>
        <p className="contact-section-error-message">{error}</p>
      </div>
    );
  }

  /**
   * Render loading state
   */
  private renderLoadingState(): ReactNode {
    return (
      <div
        className="contact-section-loading"
        role="status"
        aria-live="polite"
        aria-label="Loading contact information"
      >
        <div className="contact-section-loading-spinner" aria-hidden="true"></div>
        <p className="contact-section-loading-message">Loading contacts...</p>
      </div>
    );
  }

  /**
   * Render contact grid
   * Delegates rendering to reusable ContactGrid component
   */
  private renderContactGrid(): ReactNode {
    const { processedData, isLoading } = this.state;

    if (isLoading) {
      return this.renderLoadingState();
    }

    if (processedData.length === 0) {
      return this.renderEmptyState();
    }

    // Limit items for performance using utility helper
    // Controller could handle this, but view controls rendering limits
    const itemsToRender = safeSlice(processedData, this.MAX_ITEMS_TO_RENDER);

    return (
      <div className="contact-section-wrapper">
        <ContactGrid
          contacts={itemsToRender}
          onContactClick={this.handleContactClick}
          onCopyClick={this.handleCopyClick}
        />
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { data } = this.props;
    const validation = this.validateData();

    // Handle validation errors
    if (!validation.isValid && validation.error) {
      return (
        <Card id="contact-section">
          {this.renderErrorState(validation.error)}
        </Card>
      );
    }

    // Handle empty data
    if (!data || data.length === 0) {
      return (
        <Card id="contact-section">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="contact-section" title="Contact">
        <div className="contact-section-content">
          {this.renderContactGrid()}
          <div className="contact-form-wrapper">
            <h3 className="contact-form-title">Send me a message</h3>
            <ContactForm />
          </div>
        </div>
      </Card>
    );
  }
}

export default ContactSection;
export type { ContactSectionProps };
