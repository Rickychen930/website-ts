import React, { Component, ReactNode } from "react";

type LabelProps = {
  htmlFor: string;
  text: string;
  required?: boolean;
};

class Label extends Component<LabelProps> {
  static defaultProps = {
    required: false,
  };

  private _component: ReactNode;

  constructor(props: LabelProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { htmlFor, text, required } = this.props;

    return (
      <label htmlFor={htmlFor} className="form-label">
        {text} {required && <span style={{ color: "red" }}>*</span>}
      </label>
    );
  }

  public componentDidUpdate(prevProps: LabelProps) {
    if (
      prevProps.htmlFor !== this.props.htmlFor ||
      prevProps.text !== this.props.text ||
      prevProps.required !== this.props.required
    ) {
      this._component = this._createComponent();
    }
  }

  public render() {
    return this._component;
  }
}

export default Label;
