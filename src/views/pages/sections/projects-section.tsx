// src/sections/projects-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/projects-section.css";

export type ProjectItem = {
  key: string;
  icon: string;
  name: string;
  date: string;
  description: string;
};

type ProjectsProps = {
  data: ProjectItem[];
};

class ProjectsSection extends Component<ProjectsProps> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();

  constructor(props: ProjectsProps) {
    super(props);
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef());
    });
  }

  private renderContent(item: ProjectItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.name}</h4>
        <p className="flow-subtitle">
          <span className="flow-period">{item.date}</span>
        </p>
        <p className="flow-description">{item.description}</p>
      </div>
    );
  }

  private renderItem(item: ProjectItem, index: number): ReactNode {
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
      <Card id="projects-section" title="Projects">
        <div className="projects-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default ProjectsSection;
