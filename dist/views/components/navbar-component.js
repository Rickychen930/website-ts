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
require("../../assets/css/navbar.css");
class Navbar extends react_1.Component {
    constructor(props) {
        super(props);
        this.innerRef = (0, react_1.createRef)();
        this.brandIconRef = (0, react_1.createRef)();
        this.linksRef = (0, react_1.createRef)();
        this.toggleRef = (0, react_1.createRef)();
        this.toggleMenu = () => {
            this.setState((prev) => ({ isOpen: !prev.isOpen }), this.updateCompact);
        };
        this.handleScroll = () => {
            if (typeof window !== "undefined") {
                const isScrolled = window.scrollY > 8;
                if (isScrolled !== this.state.isScrolled) {
                    this.setState({ isScrolled });
                }
            }
        };
        this.handleResize = () => {
            this.updateCompact();
        };
        this.updateCompact = () => {
            const inner = this.innerRef.current;
            const links = this.linksRef.current;
            const toggle = this.toggleRef.current;
            if (!inner || !links)
                return;
            const innerWidth = inner.clientWidth;
            const linksWidth = links.scrollWidth;
            const toggleWidth = toggle?.offsetWidth ?? 0;
            const gapAllowance = 24;
            const needsCompact = innerWidth < linksWidth + toggleWidth + gapAllowance;
            if (needsCompact !== this.state.isCompact) {
                this.setState({ isCompact: needsCompact });
            }
        };
        this.state = { isOpen: false, isScrolled: false, isCompact: false };
    }
    componentDidMount() {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", this.handleScroll, {
                passive: true,
            });
            if ("ResizeObserver" in window) {
                this.resizeObserver = new ResizeObserver(this.updateCompact);
                if (this.innerRef.current) {
                    this.resizeObserver.observe(this.innerRef.current);
                }
            }
            else {
                window.addEventListener("resize", this.handleResize);
            }
            this.updateCompact();
            this.handleScroll();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.updateCompact();
        }
    }
    componentWillUnmount() {
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", this.handleScroll);
            if (this.resizeObserver && this.innerRef.current) {
                this.resizeObserver.unobserve(this.innerRef.current);
            }
            else {
                window.removeEventListener("resize", this.handleResize);
            }
        }
    }
    render() {
        const { items } = this.props;
        const { isOpen, isScrolled, isCompact } = this.state;
        const navClass = [
            "navbar",
            isScrolled ? "scrolled" : "",
            isCompact ? "compact" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return (<nav className={navClass}>
        <div className="navbar-inner" ref={this.innerRef}>
          {/* Branding hanya ikon */}
          <div className="navbar-brand">
            <span className="navbar-brand-icon" ref={this.brandIconRef} aria-hidden="true">
              🌐
            </span>
          </div>

          {/* Toggle button for mobile */}
          <button ref={this.toggleRef} className={`navbar-toggle ${isOpen ? "open" : ""}`} onClick={this.toggleMenu} aria-label="Toggle navigation" aria-expanded={isOpen}>
            ☰
          </button>

          {/* Navigation links */}
          <ul className={`navbar-links ${isOpen ? "open" : ""}`} ref={this.linksRef}>
            {items.map((item, index) => (<li key={index} style={{
                    transitionDelay: isOpen ? `${(index + 1) * 60}ms` : "0ms",
                }}>
                <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item}
                </a>
              </li>))}
          </ul>
        </div>
      </nav>);
    }
}
exports.default = Navbar;
