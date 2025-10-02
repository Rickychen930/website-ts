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
class Image extends react_1.Component {
    constructor(props) {
        super(props);
        this._component = this._createComponent();
    }
    _createComponent() {
        const { src, alt, width, height, style, className, rounded } = this.props;
        const combinedStyle = {
            width,
            height,
            objectFit: "cover",
            borderRadius: rounded ? "8px" : "0px",
            display: "block",
            ...style,
        };
        return (<img src={src} alt={alt} className={`image-component ${className}`} style={combinedStyle}/>);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.src !== this.props.src ||
            prevProps.alt !== this.props.alt ||
            prevProps.width !== this.props.width ||
            prevProps.height !== this.props.height ||
            prevProps.rounded !== this.props.rounded ||
            prevProps.className !== this.props.className ||
            prevProps.style !== this.props.style) {
            this._component = this._createComponent();
        }
    }
    render() {
        return this._component;
    }
}
Image.defaultProps = {
    alt: "Image",
    width: "100%",
    height: "auto",
    rounded: false,
    className: "",
    style: {},
};
exports.default = Image;
