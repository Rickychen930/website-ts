/**
 * NavbarBrand Component
 * 
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles brand/logo display and click interaction
 * 
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles brand rendering
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */
import React, { ReactNode, createRef, RefObject } from "react";

export interface NavbarBrandProps {
  icon?: string;
  text?: string;
  logo?: string; // Logo image path
  onClick: () => void;
  brandRef?: RefObject<HTMLDivElement>;
}

class NavbarBrand extends React.Component<NavbarBrandProps> {
  private defaultRef = createRef<HTMLDivElement>();

  private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.props.onClick();
    }
  };

  render(): ReactNode {
    const { icon, text, logo, onClick, brandRef = this.defaultRef } = this.props;

    return (
      <div
        ref={brandRef}
        className="navbar-brand"
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Go to top"
      >
        {logo ? (
          <>
            <img 
              src={logo} 
              alt="Logo" 
              className="navbar-brand-logo"
              loading="eager"
            />
            {text && (
              <span className="navbar-brand-text">{text}</span>
            )}
          </>
        ) : (
          <>
            {icon && (
              <span className="navbar-brand-icon" aria-hidden="true">
                {icon}
              </span>
            )}
            {text && (
              <span className="navbar-brand-text">{text}</span>
            )}
          </>
        )}
      </div>
    );
  }
}

export default NavbarBrand;

