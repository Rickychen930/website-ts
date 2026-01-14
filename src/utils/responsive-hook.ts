/**
 * Responsive Hook for Functional Components
 * React hook for responsive behavior (if needed in future)
 *
 * Note: Currently using class components, but this is ready for future migration
 */

import { useState, useEffect } from "react";
import { ResponsiveStateManager, isMobileOrTablet } from "./responsive-utils";

/**
 * Custom hook for responsive behavior
 * Returns current responsive state and updates on resize
 *
 * Usage:
 * ```typescript
 * function MyComponent() {
 *   const isMobileOrTablet = useResponsive();
 *
 *   if (isMobileOrTablet) {
 *     return <Carousel />;
 *   }
 *   return <Grid />;
 * }
 * ```
 */
export function useResponsive(): boolean {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() =>
    isMobileOrTablet(),
  );

  useEffect(() => {
    const manager = new ResponsiveStateManager();
    manager.initialize((isMobile) => {
      setIsMobileOrTablet(isMobile);
    });

    return () => {
      manager.cleanup();
    };
  }, []);

  return isMobileOrTablet;
}
