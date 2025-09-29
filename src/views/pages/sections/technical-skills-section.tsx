import React, { Component, ReactNode } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/technical-skills-section.css";

export type SkillCategory = {
  category: string;
  items: string[];
};

type TechnicalSkillsProps = {
  data: SkillCategory[];
};

class TechnicalSkillsSection extends Component<TechnicalSkillsProps> {
  // 🔹 Render helper methods
  private renderItem(item: string): ReactNode {
    return (
      <li className="skill-item" key={item}>
        <span className="skill-name">{item}</span>
      </li>
    );
  }

  private renderCategory(category: string): ReactNode {
    return (
      <div className="skill-header">
        <h4 className="skill-category">{category}</h4>
      </div>
    );
  }

  private renderBlock(skill: SkillCategory): ReactNode {
    return (
      <div className="skill-block" key={skill.category}>
        {this.renderCategory(skill.category)}
        <ul className="skill-list">
          {skill.items.map((item) => this.renderItem(item))}
        </ul>
      </div>
    );
  }

  // 🔹 Main render
  public render(): ReactNode {
    const { data } = this.props;

    return (
      <Card id="technical-skills-section" title="Technical Skills">
        <div className="skills-grid">
          {data.map((skill) => this.renderBlock(skill))}
        </div>
      </Card>
    );
  }
}

export default TechnicalSkillsSection;
