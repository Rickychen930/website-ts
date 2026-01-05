/**
 * ContactGrid Component
 * Reusable component for displaying contact cards in a grid layout
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles grid layout
 * - DRY: Reusable grid component
 * - KISS: Simple, focused component
 * - Component-Based: Composed of ContactCard components
 */

import React, { PureComponent, ReactNode } from "react";
import { IContact } from "../../../models/contact-model";
import { ContactCard } from "./ContactCard";
import "./ContactGrid.css";

/**
 * ContactGrid Props
 */
export interface ContactGridProps {
  contacts: IContact[];
  onContactClick?: (contact: IContact) => void;
  onCopyClick?: (contact: IContact) => Promise<boolean>;
  className?: string;
}

/**
 * ContactGrid Component
 * Displays contacts in a responsive grid layout
 */
export class ContactGrid extends PureComponent<ContactGridProps> {
  /**
   * Render contact cards
   */
  private renderContactCards(): ReactNode {
    const { contacts, onContactClick, onCopyClick } = this.props;

    if (!contacts || contacts.length === 0) {
      return null;
    }

    return contacts.map((contact, index) => (
      <ContactCard
        key={contact.key}
        contact={contact}
        index={index}
        onContactClick={onContactClick}
        onCopyClick={onCopyClick}
      />
    ));
  }

  public render(): ReactNode {
    const { className = "" } = this.props;

    return (
      <div className={`contact-grid ${className}`.trim()} role="list" aria-label="Contact information">
        {this.renderContactCards()}
      </div>
    );
  }
}

export default ContactGrid;

