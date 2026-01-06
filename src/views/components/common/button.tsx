import React, { PureComponent, ReactNode } from "react";
import { ButtonType, ButtonVariant, ComponentState } from "../../../types/ui";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  disabled?: ComponentState;
  className?: string;
  ariaLabel?: string;
};

/**
 * Button Component - Optimized with PureComponent
 * Performance: Uses PureComponent to prevent unnecessary re-renders
 */
class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    type: ButtonType.BUTTON,
    variant: ButtonVariant.PRIMARY,
    disabled: ComponentState.ACTIVE,
    className: "",
    ariaLabel: undefined,
  };

  protected _createComponent(): ReactNode {
    const { children, onClick, type, variant, disabled, className = "", ariaLabel } = this.props;

    const isDisabled =
      disabled === ComponentState.DISABLED ||
      disabled === ComponentState.LOADING;

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`btn btn-${variant} ${className}`.trim()}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  public render(): ReactNode {
    return this._createComponent();
  }
}

export default Button;
