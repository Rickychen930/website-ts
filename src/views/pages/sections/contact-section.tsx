import React, { Component, ReactNode } from "react";
import Card from "../../components/card-component";
import "../../../assets/css/contact-section.css";

export type ContactItem = {
  key: string;
  icon: string;
  label: string;
  value: string;
  link?: string;
};

type ContactProps = {
  data: ContactItem[];
};

class ContactSection extends Component<ContactProps> {
  // 🔹 Render helper methods
  private renderIcon(icon: string): ReactNode {
    return <div className="contact-icon">{icon}</div>;
  }

  private renderContent(item: ContactItem): ReactNode {
    return (
      <div className="contact-info">
        <span className="contact-label">{item.label}</span>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-value"
          >
            {item.value}
          </a>
        ) : (
          <span className="contact-value">{item.value}</span>
        )}
      </div>
    );
  }

  private renderItem(item: ContactItem): ReactNode {
    return (
      <div className="contact-item" key={item.key}>
        {this.renderIcon(item.icon)}
        {this.renderContent(item)}
      </div>
    );
  }

  // 🔹 Main render
  public render(): ReactNode {
    const { data } = this.props;

    return (
      <Card id="contact-section" title="Contact">
        <div className="contact-list">
          {data.map((item) => this.renderItem(item))}
        </div>
      </Card>
    );
  }
}

export default ContactSection;
