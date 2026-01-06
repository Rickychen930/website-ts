import React, { Component, ReactNode, ChangeEvent } from "react";

type InputFieldProps = {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
};

class InputField extends Component<InputFieldProps> {
  static defaultProps = {
    type: "text",
    label: undefined,
    placeholder: "",
    name: "",
    disabled: false,
  };

  private _component: ReactNode;

  constructor(props: InputFieldProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { label, value, onChange, type, placeholder, name, disabled } =
      this.props;

    return (
      <div className="input-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }

  public componentDidUpdate(prevProps: InputFieldProps) {
    if (
      prevProps.label !== this.props.label ||
      prevProps.value !== this.props.value ||
      prevProps.onChange !== this.props.onChange ||
      prevProps.type !== this.props.type ||
      prevProps.placeholder !== this.props.placeholder ||
      prevProps.name !== this.props.name
    ) {
      this._component = this._createComponent();
    }
  }

  public render() {
    return this._component;
  }
}

export default InputField;
