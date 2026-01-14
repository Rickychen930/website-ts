/**
 * Responsive Mixin for Class Components
 * Provides responsive state management for class components
 *
 * Usage:
 * ```typescript
 * class MyComponent extends Component {
 *   private responsiveMixin = new ResponsiveMixin(this);
 *
 *   componentDidMount() {
 *     this.responsiveMixin.initialize();
 *   }
 *
 *   componentWillUnmount() {
 *     this.responsiveMixin.cleanup();
 *   }
 *
 *   render() {
 *     if (this.responsiveMixin.isMobileOrTablet) {
 *       return <Carousel />;
 *     }
 *     return <Grid />;
 *   }
 * }
 * ```
 */

import { Component } from "react";
import { ResponsiveStateManager, isMobileOrTablet } from "./responsive-utils";

export class ResponsiveMixin {
  private manager: ResponsiveStateManager;
  private component: Component;
  public isMobileOrTablet: boolean;

  constructor(component: Component) {
    this.component = component;
    this.manager = new ResponsiveStateManager();
    this.isMobileOrTablet = isMobileOrTablet();
  }

  /**
   * Initialize responsive state
   */
  initialize(): void {
    this.isMobileOrTablet = isMobileOrTablet();
    this.manager.initialize((isMobile) => {
      this.isMobileOrTablet = isMobile;
      this.component.forceUpdate();
    });
  }

  /**
   * Cleanup responsive listener
   */
  cleanup(): void {
    this.manager.cleanup();
  }
}
