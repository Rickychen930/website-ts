/**
 * NavbarToggle Component
 * 
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles mobile menu toggle button
 * 
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles toggle button
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */
import React, { ReactNode, createRef, RefObject } from "react";

export interface NavbarToggleProps {
  isOpen: boolean;
  onClick: () => void;
  toggleRef?: RefObject<HTMLButtonElement>;
}

class NavbarToggle extends React.Component<NavbarToggleProps> {
  private defaultRef = createRef<HTMLButtonElement>();

  render(): ReactNode {
    const { isOpen, onClick, toggleRef = this.defaultRef } = this.props;

    return (
      <button
        ref={toggleRef}
        className={`navbar-toggle ${isOpen ? "open" : ""}`}
        onClick={onClick}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="navbar-toggle-icon">
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
        </span>
      </button>
    );
  }
}

export default NavbarToggle;

