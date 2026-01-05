/**
 * NavbarLink Component
 * 
 * Component-Based Architecture - Single Responsibility Principle (SRP)
 * Handles individual navigation link rendering
 * 
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - only handles link rendering
 * - DRY: Reusable component for each nav item
 * - KISS: Simple, focused component
 */
import React, { ReactNode } from "react";
import { NavbarItem } from "../../../types/navbar";

export interface NavbarLinkProps {
  item: NavbarItem;
  isActive: boolean;
  onClick: (itemId: string, href: string) => void;
  delay?: number;
}

class NavbarLink extends React.Component<NavbarLinkProps> {
  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    this.props.onClick(this.props.item.id, this.props.item.href);
  };

  render(): ReactNode {
    const { item, isActive, delay = 0 } = this.props;

    return (
      <li
        role="none"
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        <a
          href={item.href}
          className={isActive ? "active" : ""}
          onClick={this.handleClick}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
        >
          {item.icon && (
            <span className="navbar-link-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="navbar-link-text">{item.label}</span>
        </a>
      </li>
    );
  }
}

export default NavbarLink;

