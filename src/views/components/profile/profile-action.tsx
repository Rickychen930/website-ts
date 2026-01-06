import { Component, ReactNode } from "react";
import { ButtonVariant } from "../../../types/ui";

type ProfileActionProps = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  download?: boolean;
};

class ProfileAction extends Component<ProfileActionProps> {
  protected _component: ReactNode;

  constructor(props: ProfileActionProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const {
      label,
      href,
      variant = ButtonVariant.PRIMARY,
      download,
    } = this.props;

    return (
      <a
        href={href}
        style={{ textDecoration: "none" }}
        {...(download ? { download: true } : {})}
      >
        <button
          className={`profile-btn ${variant === ButtonVariant.SECONDARY ? "secondary" : "primary"}`}
        >
          {label}
        </button>
      </a>
    );
  }

  public componentDidUpdate(prevProps: ProfileActionProps) {
    if (
      prevProps.label !== this.props.label ||
      prevProps.href !== this.props.href ||
      prevProps.variant !== this.props.variant
    ) {
      this._component = this._createComponent();
    }
  }

  public render(): ReactNode {
    return this._component;
  }
}

export default ProfileAction;
