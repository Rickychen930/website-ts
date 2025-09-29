// src/sections/certification-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/certification-section.css";

export type CertificationItem = {
  key: string;
  icon: string;
  title: string;
  provider: string;
  date: string;
};

type CertificationProps = {
  data: CertificationItem[];
};

class CertificationSection extends Component<CertificationProps> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();

  constructor(props: CertificationProps) {
    super(props);
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef());
    });
  }

  private renderContent(item: CertificationItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.title}</h4>
        <p className="flow-subtitle">
          {item.provider} • <span className="flow-period">{item.date}</span>
        </p>
      </div>
    );
  }

  private renderItem(item: CertificationItem, index: number): ReactNode {
    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection="left"
        isVisible={true}
        refObj={this.itemRefs.get(item.key)}
        icon={<span>{item.icon}</span>}
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  public render(): ReactNode {
    const { data } = this.props;

    return (
      <Card id="certification-section" title="Certifications">
        <div className="certification-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default CertificationSection;
