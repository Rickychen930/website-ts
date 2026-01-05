import React, { ReactNode, RefObject, PureComponent } from "react";
import "../../assets/css/flow-item-component.css";

/**
 * FlowItem Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type FlowItemProps = {
  itemKey: string;
  index: number;
  scrollDirection: "up" | "down" | "left" | "right";
  isVisible: boolean;
  refObj?: RefObject<HTMLDivElement>;
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "elevated" | "minimal";
  className?: string;
};

/**
 * FlowItem Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (PureComponent for memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with staggered animations
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
 */
export class FlowItem extends PureComponent<FlowItemProps> {
  private readonly TRANSITION_DELAY_MS = 120;
  private readonly MAX_DELAY_MS = 800; // Prevent excessive delays

  /**
   * Generate class names efficiently
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { scrollDirection, isVisible, index, variant = "default", className = "" } = this.props;
    const classes = [
      "flow-item",
      `flow-variant-${variant}`,
      isVisible ? "flow-visible" : "flow-hidden",
      `flow-scroll-${scrollDirection}`,
      index % 2 === 0 ? "flow-left" : "flow-right",
      className,
    ];
    
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon if provided
   * Null-safe rendering with elegant styling
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;
    if (!icon) return null;
    
    return (
      <div className="flow-icon-wrapper" aria-hidden="true">
        <div className="flow-icon-glow"></div>
        <div className="flow-icon">{icon}</div>
      </div>
    );
  }

  /**
   * Get transition delay style
   * Performance: Optimized calculation with max delay cap
   */
  private getTransitionStyle(): React.CSSProperties {
    const { index } = this.props;
    const delay = Math.min(index * this.TRANSITION_DELAY_MS, this.MAX_DELAY_MS);
    
    return {
      transitionDelay: `${delay}ms`,
      animationDelay: `${delay}ms`,
    };
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { itemKey, refObj, children } = this.props;

    // Edge case: Ensure we have content
    if (!children) {
      return null;
    }

    return (
      <article
        key={itemKey}
        data-key={itemKey}
        ref={refObj}
        className={this.getClassNames()}
        style={this.getTransitionStyle()}
        aria-label={`Item ${this.props.index + 1}`}
      >
        {this.renderIcon()}
        <div className="flow-content">
          {children}
        </div>
      </article>
    );
  }
}
