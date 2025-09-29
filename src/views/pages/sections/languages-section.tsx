// src/sections/language-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/languages-section.css";

export type Language = {
  key: string;
  icon: string;
  name: string;
  proficiency: string;
};

type LanguageProps = {
  data: Language[];
};

class LanguageSection extends Component<LanguageProps> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();

  constructor(props: LanguageProps) {
    super(props);
    props.data.forEach((item) => {
      this.itemRefs.set(item.key, createRef());
    });
  }

  private renderContent(item: Language): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.name}</h4>
        <p className="flow-description">{item.proficiency}</p>
      </div>
    );
  }

  private renderItem(item: Language, index: number): ReactNode {
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
      <Card id="language-section" title="Languages">
        <div className="language-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default LanguageSection;
