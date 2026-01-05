/**
 * NavbarLinks Component
 * 
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles navigation links list rendering
 * 
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles links container
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 * - Composition: Uses NavbarLink component (Component-Based)
 */
import React, { ReactNode, createRef, RefObject, CSSProperties } from "react";
import { NavbarItem } from "../../../types/navbar";
import NavbarLink from "./NavbarLink";

export interface NavbarLinksProps {
  items: NavbarItem[];
  activeItemId: string | null;
  isOpen: boolean;
  isCompact: boolean;
  onClick: (itemId: string, href: string) => void;
  linksRef?: RefObject<HTMLUListElement>;
  style?: CSSProperties;
}

class NavbarLinks extends React.Component<NavbarLinksProps> {
  private defaultRef = createRef<HTMLUListElement>();

  render(): ReactNode {
    const {
      items,
      activeItemId,
      isOpen,
      isCompact,
      onClick,
      linksRef = this.defaultRef,
      style,
    } = this.props;

    const className = `navbar-links ${isOpen ? "open" : ""} ${isCompact ? "mobile" : ""}`;

    return (
      <ul
        ref={linksRef}
        className={className}
        role="menubar"
        style={style}
      >
        {items.map((item: NavbarItem, index: number) => (
          <NavbarLink
            key={item.id}
            item={item}
            isActive={activeItemId === item.id}
            onClick={onClick}
            delay={isOpen ? (index + 1) * 50 : 0}
          />
        ))}
      </ul>
    );
  }
}

export default NavbarLinks;

