import React, { Component, ReactNode } from "react";
import "../../assets/css/card-component.css";

type CardProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  id?: string;
};

class Card extends Component<CardProps> {
  static defaultProps = {
    title: undefined,
    footer: undefined,
    id: undefined,
  };

  private _component: ReactNode;

  constructor(props: CardProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { title, children, footer, id } = this.props;

    return (
      <div className="card" id={id}>
        {title && <h1 className="card-title">{title}</h1>}
        <div className="card-body">{children}</div>
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    );
  }

  public componentDidUpdate(prevProps: CardProps) {
    if (
      prevProps.title !== this.props.title ||
      prevProps.children !== this.props.children ||
      prevProps.footer !== this.props.footer ||
      prevProps.id !== this.props.id
    ) {
      this._component = this._createComponent();
    }
  }

  public render() {
    return this._component;
  }
}

export default Card;
