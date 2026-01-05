import React, { Component, ReactNode, RefObject, PureComponent } from "react";

/**
 * FlowItem Props Interface
 */
type FlowItemProps = {
  itemKey: string;
  index: number;
  scrollDirection: "up" | "down" | "left" | "right";
  isVisible: boolean;
  refObj?: RefObject<HTMLDivElement>;
  icon?: ReactNode;
  children: ReactNode;
};

/**
 * FlowItem Component
 * 
 * Optimized reusable component for timeline items
 * - Performance optimized with PureComponent
 * - Clean class name generation
 * - Proper ref handling
 * 
 * Principles: DRY, OOP, Performance
 */
export class FlowItem extends PureComponent<FlowItemProps> {
  private readonly TRANSITION_DELAY_MS = 150;

  /**
   * Generate class names efficiently
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { scrollDirection, isVisible, index } = this.props;
    const classes = ["flow-item"];
    
    if (isVisible) {
      classes.push("visible");
    }
    
    classes.push(`scroll-${scrollDirection}`);
    classes.push(index % 2 === 0 ? "left" : "right");
    
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon if provided
   * Null-safe rendering
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;
    if (!icon) return null;
    
    return <div className="flow-icon" aria-hidden="true">{icon}</div>;
  }

  /**
   * Get transition delay style
   * Performance: Memoized calculation
   */
  private getTransitionStyle(): React.CSSProperties {
    const { index } = this.props;
    return {
      transitionDelay: `${index * this.TRANSITION_DELAY_MS}ms`,
    };
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { itemKey, refObj, children } = this.props;

    return (
      <div
        key={itemKey}
        data-key={itemKey}
        ref={refObj}
        className={this.getClassNames()}
        style={this.getTransitionStyle()}
        role="listitem"
      >
        {this.renderIcon()}
        {children}
      </div>
    );
  }
}
