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
const image_component_1 = __importDefault(require("../../components/image-component"));
const profile_stat_component_1 = __importDefault(require("../../components/profile-stat-component"));
const profile_action_component_1 = __importDefault(require("../../components/profile-action-component"));
require("../../../assets/css/about-me-section.css");
const ui_1 = require("../../../types/ui");
class AboutMeSection extends react_1.Component {
    // 🔹 Render helper methods
    renderHeader() {
        const { name } = this.props.data;
        return (<h1 className="about-me-name">
        I’m <span>{name}</span>
      </h1>);
    }
    renderInformation() {
        const { title, location, bio } = this.props.data;
        return (<div className="about-me-information-section">
        <h2 className="about-me-title">{title}</h2>
        <p className="about-me-location">📍 {location}</p>
        <p className="about-me-bio">{bio}</p>
      </div>);
    }
    renderActions() {
        return (<div className="about-me-actions">
        <profile_action_component_1.default label="Download CV" href="/assets/document/RICKY_CV_8_AUG.pdf" download/>
        <profile_action_component_1.default label="Hire Me" href="#contact-section" variant={ui_1.ButtonVariant.SECONDARY}/>
      </div>);
    }
    renderStats() {
        const { stats } = this.props.data;
        return (<div className="about-me-stats">
        {stats.map((stat, index) => (<profile_stat_component_1.default key={index} value={stat.value} label={stat.label}/>))}
      </div>);
    }
    renderImage() {
        const { name } = this.props.data;
        return (<div className="about-me-image">
        <image_component_1.default src="/assets/images/ricky-profile.jpeg" alt={name} width={260} height={260} rounded/>
      </div>);
    }
    // 🔹 Main render
    render() {
        return (<card_component_1.default id="about-me-section">
        <div className="about-me-hero">
          {/* {this.renderImage()} */}
          <div className="about-me-text">
            {this.renderHeader()}
            {this.renderInformation()}
            {this.renderActions()}
            {this.renderStats()}
          </div>
        </div>
      </card_component_1.default>);
    }
}
exports.default = AboutMeSection;
