"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ui_1 = require("../../types/ui");
class ProfileAction extends react_1.Component {
    constructor(props) {
        super(props);
        this._component = this._createComponent();
    }
    _createComponent() {
        const { label, href, variant = ui_1.ButtonVariant.PRIMARY, download, } = this.props;
        return (<a href={href} style={{ textDecoration: "none" }} {...(download ? { download: true } : {})}>
        <button className={`profile-btn ${variant === ui_1.ButtonVariant.SECONDARY ? "secondary" : "primary"}`}>
          {label}
        </button>
      </a>);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.label !== this.props.label ||
            prevProps.href !== this.props.href ||
            prevProps.variant !== this.props.variant) {
            this._component = this._createComponent();
        }
    }
    render() {
        return this._component;
    }
}
exports.default = ProfileAction;
