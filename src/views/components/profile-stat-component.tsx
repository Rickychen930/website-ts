import React, { Component, ReactNode } from "react";

type ProfileStatProps = {
  value: string;
  label: string;
};

class ProfileStat extends Component<ProfileStatProps> {
  protected _component: ReactNode;

  constructor(props: ProfileStatProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { value, label } = this.props;

    return (
      <div className="profile-stat">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    );
  }

  public componentDidUpdate(prevProps: ProfileStatProps) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.label !== this.props.label
    ) {
      this._component = this._createComponent();
    }
  }

  public render(): ReactNode {
    return this._component;
  }
}

export default ProfileStat;
