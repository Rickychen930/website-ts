// src/sections/honors-section.tsx
import React, { Component, ReactNode, createRef } from "react";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";
import "../../../assets/css/honors-section.css";

export type HonorItem = {
  key: string;
  icon: string;
  title: string;
  event: string;
  date: string;
  description: string;
};

type HonorsProps = {
  data: HonorItem[];
};

type HonorsState = {
  visibleItems: Set<string>;
};

class HonorsSection extends Component<HonorsProps, HonorsState> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;

  constructor(props: HonorsProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
    };

    props.data.forEach(({ key }) => {
      this.itemRefs.set(key, createRef());
    });
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).getAttribute("data-key");
          if (entry.isIntersecting && key) {
            this.setState((prevState) => {
              const updated = new Set(prevState.visibleItems);
              updated.add(key);
              return { visibleItems: updated };
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    this.itemRefs.forEach((ref) => {
      if (ref.current) this.observer?.observe(ref.current);
    });
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  private renderContent(item: HonorItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.title}</h4>
        <p className="flow-subtitle">
          {item.event} • <span className="flow-period">{item.date}</span>
        </p>
        <p className="flow-description">{item.description}</p>
      </div>
    );
  }

  private renderItem(item: HonorItem, index: number): ReactNode {
    const { visibleItems } = this.state;

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection="left"
        isVisible={visibleItems.has(item.key)}
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
      <Card id="honors-section" title="Honors & Achievements">
        <div className="honors-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default HonorsSection;
