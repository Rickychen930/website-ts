// src/sections/soft-skills-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/soft-skills-section.css";

export type SoftSkillItem = {
  key: string;
  icon: string;
  name: string;
  description: string;
};

type SoftSkillsProps = {
  data: SoftSkillItem[];
};

class SoftSkillsSection extends Component<SoftSkillsProps> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();

  constructor(props: SoftSkillsProps) {
    super(props);
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef());
    });
  }

  private renderContent(item: SoftSkillItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.name}</h4>
        <p className="flow-description">{item.description}</p>
      </div>
    );
  }

  private renderItem(item: SoftSkillItem, index: number): ReactNode {
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
      <Card id="soft-skills-section" title="Soft Skills">
        <div className="soft-skills-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default SoftSkillsSection;
