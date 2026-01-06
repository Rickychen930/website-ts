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
import { NavbarItem, NavbarItemType } from "../../../types/navbar";
import NavbarLink from "./NavbarLink";

export interface NavbarLinksProps {
  items: NavbarItemType[];
  activeItemId: string | null;
  isOpen: boolean;
  isCompact: boolean;
  onClick: (itemId: string, href: string) => void;
  linksRef?: RefObject<HTMLUListElement>;
  style?: CSSProperties;
}

class NavbarLinks extends React.Component<NavbarLinksProps> {
  private defaultRef = createRef<HTMLUListElement>();

  /**
   * Flatten dropdown items for mobile view
   * In mobile, dropdowns are expanded as regular links
   */
  private flattenItemsForMobile(items: NavbarItemType[]): NavbarItem[] {
    const flattened: NavbarItem[] = [];

    items.forEach((item) => {
      if ('children' in item && item.children && item.children.length > 0) {
        // Add parent as a link (optional, or skip it)
        // flattened.push({ ...item, id: item.id, label: item.label, href: item.href });
        
        // Add all children
        item.children.forEach((child) => {
          flattened.push(child);
        });
      } else {
        // Regular item
        flattened.push(item as NavbarItem);
      }
    });

    return flattened;
  }

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

    // For mobile, flatten dropdown items
    const displayItems = isCompact 
      ? this.flattenItemsForMobile(items)
      : items.filter(item => !('children' in item && item.children && item.children.length > 0)) as NavbarItem[];

    return (
      <ul
        ref={linksRef}
        className={className}
        role="menubar"
        style={style}
      >
        {displayItems.map((item: NavbarItem, index: number) => (
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

