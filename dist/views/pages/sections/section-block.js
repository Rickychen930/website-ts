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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../../../assets/css/section-block.css");
class SectionBlock extends react_1.Component {
    constructor(props) {
        super(props);
        this._ref = (0, react_1.createRef)();
        this.observer = null;
        this.state = { isVisible: false };
    }
    componentDidMount() {
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !this.state.isVisible) {
                this.setState({ isVisible: true });
                this.observer?.disconnect(); // Stop observing after first reveal
            }
        }, { threshold: 0.2 });
        if (this._ref.current) {
            this.observer.observe(this._ref.current);
        }
    }
    componentWillUnmount() {
        this.observer?.disconnect();
    }
    // 🔹 Render helper methods
    renderContent() {
        return <div className="section-content">{this.props.children}</div>;
    }
    renderSection() {
        const { id } = this.props;
        const { isVisible } = this.state;
        const className = `section-block ${isVisible ? "section-visible" : "section-hidden"}`;
        return (<section id={id} ref={this._ref} className={className}>
        {this.renderContent()}
      </section>);
    }
    // 🔹 Main render
    render() {
        return this.renderSection();
    }
}
exports.default = SectionBlock;
