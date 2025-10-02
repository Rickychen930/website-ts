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
// src/sections/honors-section.tsx
const react_1 = __importStar(require("react"));
const card_component_1 = __importDefault(require("../../components/card-component"));
const flow_item_component_1 = require("../../components/flow-item-component");
require("../../../assets/css/honors-section.css");
class HonorsSection extends react_1.Component {
    constructor(props) {
        super(props);
        this.itemRefs = new Map();
        this.observer = null;
        this.state = {
            visibleItems: new Set(),
        };
        props.data.forEach(({ key }) => {
            this.itemRefs.set(key, (0, react_1.createRef)());
        });
    }
    componentDidMount() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const key = entry.target.getAttribute("data-key");
                if (entry.isIntersecting && key) {
                    this.setState((prevState) => {
                        const updated = new Set(prevState.visibleItems);
                        updated.add(key);
                        return { visibleItems: updated };
                    });
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
        this.itemRefs.forEach((ref) => {
            if (ref.current)
                this.observer?.observe(ref.current);
        });
    }
    componentWillUnmount() {
        this.observer?.disconnect();
    }
    renderContent(item) {
        return (<div className="flow-content">
        <h4 className="flow-title">{item.title}</h4>
        <p className="flow-subtitle">
          {item.event} • <span className="flow-period">{item.date}</span>
        </p>
        <p className="flow-description">{item.description}</p>
      </div>);
    }
    renderItem(item, index) {
        const { visibleItems } = this.state;
        return (<flow_item_component_1.FlowItem key={item.key} itemKey={item.key} index={index} scrollDirection="left" isVisible={visibleItems.has(item.key)} refObj={this.itemRefs.get(item.key)} icon={<span>{item.icon}</span>}>
        {this.renderContent(item)}
      </flow_item_component_1.FlowItem>);
    }
    render() {
        const { data } = this.props;
        return (<card_component_1.default id="honors-section" title="Honors & Achievements">
        <div className="honors-flow">
          {data.map((item, index) => this.renderItem(item, index))}
        </div>
      </card_component_1.default>);
    }
}
exports.default = HonorsSection;
