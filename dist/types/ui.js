"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentState = exports.ButtonVariant = exports.ButtonType = void 0;
var ButtonType;
(function (ButtonType) {
    ButtonType["SUBMIT"] = "submit";
    ButtonType["BUTTON"] = "button";
    ButtonType["RESET"] = "reset";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["PRIMARY"] = "primary";
    ButtonVariant["SECONDARY"] = "secondary";
    ButtonVariant["DANGER"] = "danger";
})(ButtonVariant = exports.ButtonVariant || (exports.ButtonVariant = {}));
var ComponentState;
(function (ComponentState) {
    ComponentState["ACTIVE"] = "active";
    ComponentState["DISABLED"] = "disabled";
    ComponentState["LOADING"] = "loading";
    ComponentState["ERROR"] = "error";
})(ComponentState = exports.ComponentState || (exports.ComponentState = {}));
