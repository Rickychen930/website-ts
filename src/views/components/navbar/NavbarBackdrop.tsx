/**
 * NavbarBackdrop Component
 *
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles backdrop/overlay for mobile menu
 *
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles backdrop rendering
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */
import React, { ReactNode, createRef, RefObject } from "react";

export interface NavbarBackdropProps {
  onClick: () => void;
  backdropRef?: RefObject<HTMLDivElement | null>;
}

class NavbarBackdrop extends React.Component<NavbarBackdropProps> {
  private defaultRef = createRef<HTMLDivElement>();

  render(): ReactNode {
    const { onClick, backdropRef = this.defaultRef } = this.props;

    return (
      <div
        ref={backdropRef}
        className="navbar-menu-backdrop"
        onClick={onClick}
        aria-hidden="true"
      />
    );
  }
}

export default NavbarBackdrop;
