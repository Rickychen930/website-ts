import React, { Component, ReactNode, createRef } from "react";
import "../../../assets/css/academic-section.css";
import Card from "../../components/card-component";
import { FlowItem } from "../../components/flow-item-component";

export type AcademicItem = {
  key: string;
  icon: string;
  title: string;
  institution: string;
  period: string;
  description: string;
};

type AcademicProps = {
  data: AcademicItem[];
};

type AcademicState = {
  visibleItems: Set<string>;
  scrollDirection: "up" | "down";
};

class AcademicSection extends Component<AcademicProps, AcademicState> {
  private itemRefs = new Map<string, React.RefObject<HTMLDivElement | null>>();
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = window.scrollY;

  constructor(props: AcademicProps) {
    super(props);
    this.state = {
      visibleItems: new Set(),
      scrollDirection: "down",
    };

    props.data.forEach(({ key }) => {
      this.itemRefs.set(key, createRef());
    });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollDirection);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).getAttribute("data-key");
          if (key) {
            this.setState((prevState) => {
              const updated = new Set(prevState.visibleItems);
              if (entry.isIntersecting) {
                updated.add(key);
              } else {
                updated.delete(key);
              }
              return { visibleItems: updated };
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    this.itemRefs.forEach((ref) => {
      if (ref.current) this.observer?.observe(ref.current);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollDirection);
    this.observer?.disconnect();
  }

  private handleScrollDirection = () => {
    const currentY = window.scrollY;
    const direction = currentY > this.lastScrollY ? "down" : "up";
    this.lastScrollY = currentY;
    this.setState({ scrollDirection: direction });
  };

  private renderContent(item: AcademicItem): ReactNode {
    return (
      <div className="flow-content">
        <h4 className="flow-title">{item.title}</h4>
        <p className="flow-subtitle">
          {item.institution} •{" "}
          <span className="flow-period">{item.period}</span>
        </p>
        <p className="flow-description">{item.description}</p>
      </div>
    );
  }

  private renderItem(item: AcademicItem, index: number): ReactNode {
    const { visibleItems, scrollDirection } = this.state;

    return (
      <FlowItem
        key={item.key}
        itemKey={item.key}
        index={index}
        scrollDirection={scrollDirection}
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
      <Card id="academic-section" title="Academic Background">
        <div className="academic-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </Card>
    );
  }
}

export default AcademicSection;
