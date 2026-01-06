/**
 * NavbarComponent - Main Navbar Component (Refactored)
 * 
 * Component-Based Architecture with OOP, SOLID, DRY, KISS principles
 * 
 * This is a wrapper component that uses NavbarContainer internally
 * Maintains backward compatibility while using new architecture
 */
import React from "react";
import NavbarContainer from "./NavbarContainer";
import "../../../assets/css/navbar.css";

import { NavbarItemType } from "../../../types/navbar";

interface NavbarComponentProps {
  items: string[] | NavbarItemType[];
  brandIcon?: string;
  brandText?: string;
  brandLogo?: string; // Logo image path
  useDropdowns?: boolean; // Enable dropdown mode
}

/**
 * NavbarComponent - Exports as main navbar component
 * Delegates to NavbarContainer for component-based architecture
 */
class NavbarComponent extends React.Component<NavbarComponentProps> {
  render() {
    return <NavbarContainer {...this.props} />;
  }
}

export default NavbarComponent;
