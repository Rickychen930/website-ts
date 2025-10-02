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
const ui_1 = require("../../types/ui");
class Button extends react_1.Component {
    constructor(props) {
        super(props);
        this._component = this._createComponent();
    }
    _createComponent() {
        const { children, onClick, type, variant, disabled } = this.props;
        const isDisabled = disabled === ui_1.ComponentState.DISABLED ||
            disabled === ui_1.ComponentState.LOADING;
        return (<button type={type} onClick={onClick} disabled={isDisabled} className={`btn btn-${variant}`}>
        {children}
      </button>);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children ||
            prevProps.variant !== this.props.variant ||
            prevProps.disabled !== this.props.disabled ||
            prevProps.type !== this.props.type) {
            this._component = this._createComponent();
        }
    }
    render() {
        return this._component;
    }
}
Button.defaultProps = {
    type: ui_1.ButtonType.BUTTON,
    variant: ui_1.ButtonVariant.PRIMARY,
    disabled: ui_1.ComponentState.ACTIVE,
};
exports.default = Button;
