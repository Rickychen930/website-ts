/**
 * Responsive Component Base
 * Base class for components that need responsive behavior
 *
 * Best Practice Approach:
 * - Single source of truth for responsive state
 * - Automatic resize handling
 * - Performance optimized (throttled)
 * - SSR-safe
 * - Type-safe
 *
 * Usage:
 * ```typescript
 * class MyComponent extends ResponsiveComponentBase<Props, State> {
 *   render() {
 *     if (this.isMobileOrTablet) {
 *       return <Carousel />;
 *     }
 *     return <Grid />;
 *   }
 * }
 * ```
 */

import { Component, ComponentType } from "react";
import { ResponsiveStateManager, isMobileOrTablet } from "./responsive-utils";

/**
 * Base class for responsive components
 * Provides automatic responsive state management
 */
export abstract class ResponsiveComponentBase<P = {}, S = {}> extends Component<
  P,
  S & { isMobileOrTablet: boolean }
> {
  private responsiveManager: ResponsiveStateManager;

  constructor(props: P) {
    super(props);
    this.responsiveManager = new ResponsiveStateManager();

    // Initialize state with current responsive state
    const initialState =
      this.state || ({} as S & { isMobileOrTablet: boolean });
    (this.state as S & { isMobileOrTablet: boolean }) = {
      ...initialState,
      isMobileOrTablet: isMobileOrTablet(),
    };
  }

  /**
   * Component Did Mount
   * Initialize responsive state manager
   */
  componentDidMount(): void {
    super.componentDidMount?.();

    this.responsiveManager.initialize((isMobile) => {
      this.setState({ isMobileOrTablet: isMobile } as Partial<
        S & { isMobileOrTablet: boolean }
      >);
    });
  }

  /**
   * Component Will Unmount
   * Cleanup responsive listener
   */
  componentWillUnmount(): void {
    super.componentWillUnmount?.();
    this.responsiveManager.cleanup();
  }

  /**
   * Get current responsive state
   * Convenience getter
   */
  get isMobileOrTablet(): boolean {
    return this.state?.isMobileOrTablet ?? isMobileOrTablet();
  }
}

/**
 * Higher Order Component for Responsive Behavior
 * Alternative approach for components that can't extend base class
 *
 * Usage:
 * ```typescript
 * class MyComponent extends Component<Props, State> {
 *   // ... component code
 * }
 *
 * export default withResponsive(MyComponent);
 * ```
 */
export function withResponsive<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  return class ResponsiveWrapper extends Component<
    P,
    { isMobileOrTablet: boolean }
  > {
    private responsiveManager: ResponsiveStateManager;

    constructor(props: P) {
      super(props);
      this.responsiveManager = new ResponsiveStateManager();
      this.state = {
        isMobileOrTablet: isMobileOrTablet(),
      };
    }

    componentDidMount(): void {
      this.responsiveManager.initialize((isMobile) => {
        this.setState({ isMobileOrTablet: isMobile });
      });
    }

    componentWillUnmount(): void {
      this.responsiveManager.cleanup();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isMobileOrTablet={this.state.isMobileOrTablet}
        />
      );
    }
  };
}
