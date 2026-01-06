import React, { Component, ReactNode } from "react";
import { ButtonType, ButtonVariant, ComponentState } from "../../../types/ui";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  disabled?: ComponentState;
};

class Button extends Component<ButtonProps> {
  static defaultProps = {
    type: ButtonType.BUTTON,
    variant: ButtonVariant.PRIMARY,
    disabled: ComponentState.ACTIVE,
  };

  private _component: ReactNode;

  constructor(props: ButtonProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { children, onClick, type, variant, disabled } = this.props;

    const isDisabled =
      disabled === ComponentState.DISABLED ||
      disabled === ComponentState.LOADING;

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`btn btn-${variant}`}
      >
        {children}
      </button>
    );
  }

  public componentDidUpdate(prevProps: ButtonProps) {
    if (
      prevProps.children !== this.props.children ||
      prevProps.variant !== this.props.variant ||
      prevProps.disabled !== this.props.disabled ||
      prevProps.type !== this.props.type
    ) {
      this._component = this._createComponent();
    }
  }

  public render() {
    return this._component;
  }
}

export default Button;
