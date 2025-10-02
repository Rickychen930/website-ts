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
class Label extends react_1.Component {
    constructor(props) {
        super(props);
        this._component = this._createComponent();
    }
    _createComponent() {
        const { htmlFor, text, required } = this.props;
        return (<label htmlFor={htmlFor} className="form-label">
        {text} {required && <span style={{ color: "red" }}>*</span>}
      </label>);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.htmlFor !== this.props.htmlFor ||
            prevProps.text !== this.props.text ||
            prevProps.required !== this.props.required) {
            this._component = this._createComponent();
        }
    }
    render() {
        return this._component;
    }
}
Label.defaultProps = {
    required: false,
};
exports.default = Label;
