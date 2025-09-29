import React, { Component, ReactNode, RefObject } from "react";

type FlowItemProps = {
  itemKey: string;
  index: number;
  scrollDirection: "up" | "down" | "left" | "right"; // ✅ extended
  isVisible: boolean;
  refObj?: RefObject<HTMLDivElement | null>;
  icon?: ReactNode;
  children: ReactNode;
};

export class FlowItem extends Component<FlowItemProps> {
  getClassNames(): string {
    const { scrollDirection, isVisible, index } = this.props;
    return [
      "flow-item",
      isVisible ? "visible" : "",
      `scroll-${scrollDirection}`,
      index % 2 === 0 ? "left" : "right",
    ].join(" ");
  }

  renderIcon(): ReactNode {
    const { icon } = this.props;
    return icon ? <div className="flow-icon">{icon}</div> : null;
  }

  render(): ReactNode {
    const { itemKey, refObj, index, children } = this.props;

    return (
      <div
        key={itemKey}
        data-key={itemKey}
        ref={refObj}
        className={this.getClassNames()}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {this.renderIcon()}
        {children}
      </div>
    );
  }
}
