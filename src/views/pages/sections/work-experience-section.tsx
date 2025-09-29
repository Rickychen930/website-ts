// src/sections/work-experience-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/work-experience-section.css";

export type ExperienceItem = {
  key: string;
  icon: string; // Can be emoji or JSX
  title: string;
  company: string;
  period: string;
  description: string;
};

type WorkExperienceProps = {
  data: ExperienceItem[];
};

class WorkExperienceSection extends Component<WorkExperienceProps> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();

  constructor(props: WorkExperienceProps) {
    super(props);
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef());
    });
  }

  private renderContent(item: ExperienceItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.title}</h4>
        <p className="flow-subtitle">
          {item.company} • <span className="flow-period">{item.period}</span>
        </p>
        <p className="flow-description">{item.description}</p>
      </div>
    );
  }

  private renderItem(item: ExperienceItem, index: number): ReactNode {
    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection="left"
        isVisible={true}
        refObj={this.itemRefs.get(item.key)}
        icon={<span>{item.icon}</span>} // Wrap string as ReactNode
      >
        {this.renderContent(item)}
      </FlowItem>
    );
  }

  public render(): ReactNode {
    const { data } = this.props;

    return (
      <Card id="work-experience-section" title="Work Experience">
        <div className="work-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default WorkExperienceSection;
