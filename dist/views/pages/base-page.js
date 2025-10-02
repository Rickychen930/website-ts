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
class BasePage extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }
    // 🔹 Utility
    setLoading(isLoading) {
        this.setState({ isLoading });
    }
    // 🔹 Render helper methods
    renderHeader() {
        const { title } = this.props;
        return title ? <h1 className="page-title">{title}</h1> : null;
    }
    renderLoading() {
        return <p>Loading...</p>;
    }
    renderContent() {
        return this.props.children;
    }
    renderFooter() {
        return null; // Override in subclass if needed
    }
    renderBody() {
        return (<div className="page-content">
        {this.state.isLoading ? this.renderLoading() : this.renderContent()}
      </div>);
    }
    // 🔹 Main render
    render() {
        return (<div className="page-container">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </div>);
    }
}
BasePage.defaultProps = {
    title: "",
};
exports.default = BasePage;
