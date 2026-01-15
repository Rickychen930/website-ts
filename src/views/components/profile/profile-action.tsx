import { Component, ReactNode } from "react";
import { ButtonVariant } from "../../../types/ui";

type ProfileActionProps = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  download?: boolean;
  className?: string;
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
      className,
    } = this.props;

    const baseClassName = `profile-btn ${variant === ButtonVariant.SECONDARY ? "secondary" : "primary"}`;
    const finalClassName = className
      ? `${baseClassName} ${className}`
      : baseClassName;

    return (
      <a
        href={href}
        style={{ textDecoration: "none" }}
        {...(download ? { download: true } : {})}
      >
        <button type="button" className={finalClassName}>
          {label}
        </button>
      </a>
    );
  }

  public componentDidUpdate(prevProps: ProfileActionProps) {
    if (
      prevProps.label !== this.props.label ||
      prevProps.href !== this.props.href ||
      prevProps.variant !== this.props.variant ||
      prevProps.className !== this.props.className
    ) {
      this._component = this._createComponent();
    }
  }

  public render(): ReactNode {
    return this._component;
  }
}

export default ProfileAction;
