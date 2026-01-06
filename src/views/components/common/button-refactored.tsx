/**
 * Button Component - Refactored with New CSS Architecture
 * Professional, Code-Based, OOP, SOLID, DRY, KISS
 *
 * This is an example of how to refactor existing components to use the new CSS architecture
 *
 * Architecture:
 * - Uses new CSS component classes (btn, btn--primary, etc.)
 * - Uses CSS helpers for class name building
 * - Follows BEM naming convention
 * - Type-safe with TypeScript
 *
 * Usage:
 * import Button from '@/views/components/common/button-refactored';
 *
 * <Button variant="primary" size="large">Click me</Button>
 */

import React, { PureComponent, ReactNode } from "react";
import { ButtonType, ButtonVariant, ComponentState } from "../../../types/ui";
import { btnClass, cn } from "../../../utils/css-helpers";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant | "outline" | "ghost";
  size?: "small" | "default" | "large" | "icon";
  disabled?: ComponentState;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
};

/**
 * Button Component - Refactored
 * Uses new CSS architecture with utility classes
 */
class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    type: ButtonType.BUTTON,
    variant: ButtonVariant.PRIMARY,
    size: "default" as const,
    disabled: ComponentState.ACTIVE,
    loading: false,
    className: "",
    ariaLabel: undefined,
    icon: undefined,
  };

  private getVariantClass(): string {
    const { variant } = this.props;

    // Map ButtonVariant enum to CSS class variant
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return "primary";
      case ButtonVariant.SECONDARY:
        return "secondary";
      case ButtonVariant.DANGER:
        return "danger";
      case "outline":
        return "outline";
      case "ghost":
        return "ghost";
      default:
        return "primary";
    }
  }

  private getSizeClass(): "small" | "default" | "large" | "icon" {
    return this.props.size || "default";
  }

  protected _createComponent(): ReactNode {
    const {
      children,
      onClick,
      type,
      disabled,
      loading,
      className = "",
      ariaLabel,
      icon,
    } = this.props;

    const isDisabled =
      disabled === ComponentState.DISABLED ||
      disabled === ComponentState.LOADING ||
      loading;

    const variant = this.getVariantClass();
    const size = this.getSizeClass();

    // Build class names using CSS helpers
    const buttonClasses = cn(
      btnClass(
        variant as
          | "primary"
          | "secondary"
          | "danger"
          | "outline"
          | "ghost"
          | undefined,
        size,
      ),
      loading && "btn--loading",
      isDisabled && "btn--disabled",
      className,
    );

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={buttonClasses}
        aria-label={ariaLabel}
      >
        {icon && <span className="btn__icon">{icon}</span>}
        {children && <span className="btn__text">{children}</span>}
      </button>
    );
  }

  public render(): ReactNode {
    return this._createComponent();
  }
}

export default Button;
