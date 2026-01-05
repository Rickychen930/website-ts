import React, { Component, PureComponent, ReactNode } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/contact-section.css";

export type ContactItem = {
  key: string;
  icon: string;
  label: string;
  value: string;
  link?: string;
};

type ContactProps = {
  data: ContactItem[];
};

type ContactItemState = {
  isHovered: boolean;
  isFocused: boolean;
};

/**
 * ContactItemComponent - Individual contact item with enhanced interactions
 * Follows Single Responsibility Principle (SRP)
 * Uses PureComponent for performance optimization
 */
class ContactItemComponent extends PureComponent<
  { item: ContactItem; index: number },
  ContactItemState
> {
  constructor(props: { item: ContactItem; index: number }) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false,
    };
  }

  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  private handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  private handleFocus = (): void => {
    this.setState({ isFocused: true });
  };

  private handleBlur = (): void => {
    this.setState({ isFocused: false });
  };

  /**
   * Render contact icon with accessibility
   */
  private renderIcon(): ReactNode {
    const { item } = this.props;
    const { isHovered, isFocused } = this.state;

    return (
      <div
        className={`contact-icon ${isHovered || isFocused ? "contact-icon-active" : ""}`}
        aria-hidden="true"
        role="presentation"
      >
        {item.icon}
      </div>
    );
  }

  /**
   * Render contact value with proper link handling
   */
  private renderValue(): ReactNode {
    const { item } = this.props;
    const { isHovered, isFocused } = this.state;

    if (item.link) {
      return (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`contact-value contact-link ${isHovered || isFocused ? "contact-link-active" : ""}`}
          aria-label={`${item.label}: ${item.value} (opens in new tab)`}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {item.value}
        </a>
      );
    }

    return (
      <span
        className="contact-value"
        aria-label={`${item.label}: ${item.value}`}
      >
        {item.value}
      </span>
    );
  }

  /**
   * Render contact content (label + value)
   */
  private renderContent(): ReactNode {
    const { item } = this.props;

    return (
      <div className="contact-info">
        <span className="contact-label" aria-label={item.label}>
          {item.label}
        </span>
        {this.renderValue()}
      </div>
    );
  }

  public render(): ReactNode {
    const { item, index } = this.props;

    return (
      <div
        className="contact-item"
        style={{ animationDelay: `${index * 0.1}s` }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role="listitem"
        aria-label={`Contact method: ${item.label}`}
      >
        {this.renderIcon()}
        {this.renderContent()}
      </div>
    );
  }
}

/**
 * ContactSection - Main contact section component
 * Follows SOLID principles and best practices
 */
class ContactSection extends Component<ContactProps> {
  /**
   * Validate contact data with edge case handling
   */
  private isValidContactData(data: ContactItem[]): boolean {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }
    
    // Filter out invalid items
    return data.some((item) => 
      item && 
      typeof item === 'object' && 
      item.label && 
      item.value
    );
  }

  /**
   * Sanitize and validate contact item
   */
  private sanitizeContactItem(item: ContactItem, index: number): ContactItem | null {
    if (!item || typeof item !== 'object') {
      return null;
    }

    // Ensure required fields exist
    if (!item.label || !item.value) {
      return null;
    }

    // Ensure key exists
    const sanitizedItem: ContactItem = {
      key: item.key || `contact-${index}`,
      icon: item.icon || '📧',
      label: String(item.label).trim(),
      value: String(item.value).trim(),
    };

    // Add link if valid URL
    if (item.link) {
      try {
        new URL(item.link);
        sanitizedItem.link = item.link;
      } catch {
        // Invalid URL, skip link
      }
    }

    return sanitizedItem;
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="contact-empty" role="status" aria-live="polite">
        <div className="contact-empty-icon" aria-hidden="true">📭</div>
        <p className="contact-empty-text">No contact information available</p>
      </div>
    );
  }

  /**
   * Render contact items list with edge case handling
   */
  private renderContactList(): ReactNode {
    const { data } = this.props;

    if (!this.isValidContactData(data)) {
      return this.renderEmptyState();
    }

    // Sanitize and filter valid items
    const validItems = data
      .map((item, index) => this.sanitizeContactItem(item, index))
      .filter((item): item is ContactItem => item !== null);

    if (validItems.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="contact-list" role="list" aria-label="Contact information">
        {validItems.map((item, index) => (
          <ContactItemComponent
            key={item.key}
            item={item}
            index={index}
          />
        ))}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    return (
      <Card id="contact-section" title="Contact">
        {this.renderContactList()}
      </Card>
    );
  }
}

export default ContactSection;
