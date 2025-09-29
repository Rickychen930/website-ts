import React, { Component, ReactNode, CSSProperties } from "react";

type ImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  rounded?: boolean;
};

class Image extends Component<ImageProps> {
  static defaultProps = {
    alt: "Image",
    width: "100%",
    height: "auto",
    rounded: false,
    className: "",
    style: {},
  };

  private _component: ReactNode;

  constructor(props: ImageProps) {
    super(props);
    this._component = this._createComponent();
  }

  protected _createComponent(): ReactNode {
    const { src, alt, width, height, style, className, rounded } = this.props;

    const combinedStyle: CSSProperties = {
      width,
      height,
      objectFit: "cover",
      borderRadius: rounded ? "8px" : "0px",
      display: "block",
      ...style,
    };

    return (
      <img
        src={src}
        alt={alt}
        className={`image-component ${className}`}
        style={combinedStyle}
      />
    );
  }

  public componentDidUpdate(prevProps: ImageProps) {
    if (
      prevProps.src !== this.props.src ||
      prevProps.alt !== this.props.alt ||
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      prevProps.rounded !== this.props.rounded ||
      prevProps.className !== this.props.className ||
      prevProps.style !== this.props.style
    ) {
      this._component = this._createComponent();
    }
  }

  public render(): ReactNode {
    return this._component;
  }
}

export default Image;
