/**
 * NavbarMobileMenu Component
 * 
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles mobile menu rendering with portal
 * 
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles mobile menu portal
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 * - Composition: Uses NavbarLinks and NavbarBackdrop (Component-Based)
 */
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import NavbarLinks, { NavbarLinksProps } from "./NavbarLinks";
import NavbarBackdrop from "./NavbarBackdrop";

export interface NavbarMobileMenuProps extends Omit<NavbarLinksProps, "isCompact"> {
  portalRoot: HTMLElement;
  onBackdropClick: () => void;
  menuPosition?: { top: number; right: number };
}

class NavbarMobileMenu extends React.Component<NavbarMobileMenuProps> {
  private backdropRef = React.createRef<HTMLDivElement>();

  render(): ReactNode {
    const {
      items,
      activeItemId,
      isOpen,
      onClick,
      linksRef,
      portalRoot,
      onBackdropClick,
      menuPosition,
    } = this.props;

    const menuStyle = menuPosition
      ? {
          position: "fixed" as const,
          top: `${menuPosition.top}px`,
          right: `${menuPosition.right}px`,
          zIndex: 9999,
        }
      : undefined;

    return createPortal(
      <>
        {/* Backdrop - only visible when menu is open */}
        {isOpen && (
          <NavbarBackdrop onClick={onBackdropClick} backdropRef={this.backdropRef} />
        )}
        {/* Menu */}
        <NavbarLinks
          items={items}
          activeItemId={activeItemId}
          isOpen={isOpen}
          isCompact={true}
          onClick={onClick}
          linksRef={linksRef}
          style={menuStyle}
        />
      </>,
      portalRoot
    );
  }
}

export default NavbarMobileMenu;

