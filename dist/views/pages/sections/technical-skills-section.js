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
require("../../../assets/css/technical-skills-section.css");
class TechnicalSkillsSection extends react_1.Component {
    // 🔹 Render helper methods
    renderItem(item) {
        return (<li className="skill-item" key={item}>
        <span className="skill-name">{item}</span>
      </li>);
    }
    renderCategory(category) {
        return (<div className="skill-header">
        <h4 className="skill-category">{category}</h4>
      </div>);
    }
    renderBlock(skill) {
        return (<div className="skill-block" key={skill.category}>
        {this.renderCategory(skill.category)}
        <ul className="skill-list">
          {skill.items.map((item) => this.renderItem(item))}
        </ul>
      </div>);
    }
    // 🔹 Main render
    render() {
        const { data } = this.props;
        return (<card_component_1.default id="technical-skills-section" title="Technical Skills">
        <div className="skills-grid">
          {data.map((skill) => this.renderBlock(skill))}
        </div>
      </card_component_1.default>);
    }
}
exports.default = TechnicalSkillsSection;
