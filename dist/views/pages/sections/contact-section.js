"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const card_component_1 = __importDefault(require("../../components/card-component"));
require("../../../assets/css/contact-section.css");
class ContactSection extends react_1.Component {
    // 🔹 Render helper methods
    renderIcon(icon) {
        return <div className="contact-icon">{icon}</div>;
    }
    renderContent(item) {
        return (<div className="contact-info">
        <span className="contact-label">{item.label}</span>
        {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer" className="contact-value">
            {item.value}
          </a>) : (<span className="contact-value">{item.value}</span>)}
      </div>);
    }
    renderItem(item) {
        return (<div className="contact-item" key={item.key}>
        {this.renderIcon(item.icon)}
        {this.renderContent(item)}
      </div>);
    }
    // 🔹 Main render
    render() {
        const { data } = this.props;
        return (<card_component_1.default id="contact-section" title="Contact">
        <div className="contact-list">
          {data.map((item) => this.renderItem(item))}
        </div>
      </card_component_1.default>);
    }
}
exports.default = ContactSection;
