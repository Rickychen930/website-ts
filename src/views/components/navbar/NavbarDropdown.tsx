/**
 * NavbarDropdown Component
 *
 * Professional dropdown menu component for navbar
 * Follows Component-Based Architecture
 *
 * Principles:
 * - OOP: Encapsulated component with clear interface
 * - SOLID: Single responsibility - handles dropdown rendering
 * - DRY: Reusable dropdown component
 * - KISS: Simple, focused component
 */
import React, { ReactNode, createRef, RefObject } from "react";
import { NavbarDropdownItem, NavbarItem } from "../../../types/navbar";

export interface NavbarDropdownProps {
  item: NavbarDropdownItem;
  isOpen: boolean;
  isActive: boolean;
  activeItemId: string | null;
  onClick: (itemId: string, href: string) => void;
  onToggle: (dropdownId: string) => void;
  onClose: () => void;
  dropdownRef?: RefObject<HTMLDivElement>;
}

class NavbarDropdown extends React.Component<NavbarDropdownProps> {
  private defaultRef = createRef<HTMLDivElement>();
  private timeoutId: NodeJS.Timeout | null = null;

  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;

  private keyboardHandler: ((event: KeyboardEvent) => void) | null = null;

  componentDidMount(): void {
    this.setupClickOutside();
    this.setupKeyboard();
  }

  componentDidUpdate(prevProps: NavbarDropdownProps): void {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setupClickOutside();
      this.setupKeyboard();
    }
  }

  componentWillUnmount(): void {
    this.cleanup();
  }

  private setupClickOutside = (): void => {
    if (typeof document === "undefined") return;

    // Remove existing handler
    if (this.clickOutsideHandler) {
      document.removeEventListener("mousedown", this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }

    // Add new handler if dropdown is open
    if (this.props.isOpen) {
      this.clickOutsideHandler = (event: MouseEvent): void => {
        const ref = this.props.dropdownRef || this.defaultRef;
        if (ref.current && !ref.current.contains(event.target as Node)) {
          this.props.onClose();
        }
      };
      document.addEventListener("mousedown", this.clickOutsideHandler);
    }
  };

  private setupKeyboard = (): void => {
    if (typeof document === "undefined") return;

    // Remove existing handler
    if (this.keyboardHandler) {
      document.removeEventListener("keydown", this.keyboardHandler);
      this.keyboardHandler = null;
    }

    // Add new handler if dropdown is open
    if (this.props.isOpen) {
      this.keyboardHandler = (event: KeyboardEvent): void => {
        const ref = this.props.dropdownRef || this.defaultRef;
        if (!ref.current) return;

        // Escape to close
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          this.props.onClose();
          // Return focus to toggle button
          const toggleButton = ref.current.querySelector(
            ".navbar-dropdown-toggle",
          ) as HTMLElement;
          toggleButton?.focus();
        }
        // Arrow keys for navigation (if needed in future)
        // Tab key is handled by browser default behavior
      };
      document.addEventListener("keydown", this.keyboardHandler);
    }
  };

  private cleanup = (): void => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.clickOutsideHandler) {
      document.removeEventListener("mousedown", this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
    if (this.keyboardHandler) {
      document.removeEventListener("keydown", this.keyboardHandler);
      this.keyboardHandler = null;
    }
  };

  private handleToggle = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onToggle(this.props.item.id);
  };

  private handleItemClick = (e: React.MouseEvent, item: NavbarItem): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(item.id, item.href);
    this.props.onClose();
  };

  private handleMouseEnter = (): void => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };

  private handleMouseLeave = (): void => {
    // Close dropdown after a short delay when mouse leaves
    this.timeoutId = setTimeout(() => {
      this.props.onClose();
    }, 200);
  };

  render(): ReactNode {
    const {
      item,
      isOpen,
      isActive,
      activeItemId,
      dropdownRef = this.defaultRef,
    } = this.props;
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
      return null;
    }

    // Determine dropdown type for special hover effects
    const dropdownType = item.label.toLowerCase().includes("education")
      ? "education"
      : item.label.toLowerCase().includes("skills")
        ? "skills"
        : null;

    return (
      <div
        ref={dropdownRef}
        className={`navbar-dropdown ${isOpen ? "open" : ""} ${isActive ? "active" : ""}`}
        data-dropdown={dropdownType || undefined}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <button
          className="navbar-dropdown-toggle"
          onClick={this.handleToggle}
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <span className="navbar-dropdown-label">{item.label}</span>
          <span className={`navbar-dropdown-icon ${isOpen ? "open" : ""}`}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="navbar-dropdown-menu">
            <ul className="navbar-dropdown-list" role="menu">
              {item.children!.map((childItem, index) => (
                <li key={childItem.id} role="none">
                  <a
                    href={childItem.href}
                    className={`navbar-dropdown-item ${
                      activeItemId === childItem.id ? "active" : ""
                    }`}
                    onClick={(e) => this.handleItemClick(e, childItem)}
                    role="menuitem"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    {childItem.icon && (
                      <span
                        className="navbar-dropdown-item-icon"
                        aria-hidden="true"
                      >
                        {childItem.icon}
                      </span>
                    )}
                    <span className="navbar-dropdown-item-text">
                      {childItem.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default NavbarDropdown;
