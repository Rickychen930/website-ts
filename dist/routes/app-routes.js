"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const main_page_1 = __importDefault(require("../views/pages/main-page"));
const AppRoutes = () => {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path="/" element={<main_page_1.default />}/>
      {/* Future routes can be added here */}
      <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/" replace/>}/>
    </react_router_dom_1.Routes>);
};
exports.default = AppRoutes;
