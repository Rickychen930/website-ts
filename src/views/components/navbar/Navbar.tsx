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

interface NavbarComponentProps {
  items: string[];
  brandIcon?: string;
  brandText?: string;
  brandLogo?: string; // Logo image path
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
