"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const app_routes_1 = __importDefault(require("./routes/app-routes"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <app_routes_1.default />
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
