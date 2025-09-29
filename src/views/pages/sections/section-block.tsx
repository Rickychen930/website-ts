import React, { Component, ReactNode, createRef } from "react";
import "../../../assets/css/section-block.css";

type SectionBlockProps = {
  id?: string;
  title?: string;
  children: ReactNode;
};

type SectionBlockState = {
  isVisible: boolean;
};

class SectionBlock extends Component<SectionBlockProps, SectionBlockState> {
  private _ref = createRef<HTMLElement>();
  private observer: IntersectionObserver | null = null;

  constructor(props: SectionBlockProps) {
    super(props);
    this.state = { isVisible: false };
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.state.isVisible) {
          this.setState({ isVisible: true });
          this.observer?.disconnect(); // Stop observing after first reveal
        }
      },
      { threshold: 0.2 }
    );

    if (this._ref.current) {
      this.observer.observe(this._ref.current);
    }
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  // 🔹 Render helper methods
  private renderContent(): ReactNode {
    return <div className="section-content">{this.props.children}</div>;
  }

  private renderSection(): ReactNode {
    const { id } = this.props;
    const { isVisible } = this.state;
    const className = `section-block ${isVisible ? "section-visible" : "section-hidden"}`;

    return (
      <section id={id} ref={this._ref} className={className}>
        {this.renderContent()}
      </section>
    );
  }

  // 🔹 Main render
  public render(): ReactNode {
    return this.renderSection();
  }
}

export default SectionBlock;
