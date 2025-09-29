import React, { Component, ReactNode, createRef } from "react";
import "../../assets/css/navbar.css";

type NavbarProps = {
  items: string[];
};

type NavbarState = {
  isOpen: boolean;
  isScrolled: boolean;
  isCompact: boolean;
};

class Navbar extends Component<NavbarProps, NavbarState> {
  private innerRef = createRef<HTMLDivElement>();
  private brandIconRef = createRef<HTMLSpanElement>();
  private linksRef = createRef<HTMLUListElement>();
  private toggleRef = createRef<HTMLButtonElement>();
  private resizeObserver?: ResizeObserver;

  constructor(props: NavbarProps) {
    super(props);
    this.state = { isOpen: false, isScrolled: false, isCompact: false };
  }

  private toggleMenu = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }), this.updateCompact);
  };

  private handleScroll = () => {
    if (typeof window !== "undefined") {
      const isScrolled = window.scrollY > 8;
      if (isScrolled !== this.state.isScrolled) {
        this.setState({ isScrolled });
      }
    }
  };

  private handleResize = () => {
    this.updateCompact();
  };

  private updateCompact = () => {
    const inner = this.innerRef.current;
    const links = this.linksRef.current;
    const toggle = this.toggleRef.current;

    if (!inner || !links) return;

    const innerWidth = inner.clientWidth;
    const linksWidth = links.scrollWidth;
    const toggleWidth = toggle?.offsetWidth ?? 0;
    const gapAllowance = 24;

    const needsCompact = innerWidth < linksWidth + toggleWidth + gapAllowance;

    if (needsCompact !== this.state.isCompact) {
      this.setState({ isCompact: needsCompact });
    }
  };

  componentDidMount(): void {
    if (typeof window !== "undefined") {
      (window as Window).addEventListener("scroll", this.handleScroll, {
        passive: true,
      });

      if ("ResizeObserver" in window) {
        this.resizeObserver = new ResizeObserver(this.updateCompact);
        if (this.innerRef.current) {
          this.resizeObserver.observe(this.innerRef.current);
        }
      } else {
        (window as Window).addEventListener("resize", this.handleResize);
      }

      this.updateCompact();
      this.handleScroll();
    }
  }

  componentDidUpdate(prevProps: NavbarProps): void {
    if (prevProps.items !== this.props.items) {
      this.updateCompact();
    }
  }

  componentWillUnmount(): void {
    if (typeof window !== "undefined") {
      (window as Window).removeEventListener("scroll", this.handleScroll);
      if (this.resizeObserver && this.innerRef.current) {
        this.resizeObserver.unobserve(this.innerRef.current);
      } else {
        (window as Window).removeEventListener("resize", this.handleResize);
      }
    }
  }

  render(): ReactNode {
    const { items } = this.props;
    const { isOpen, isScrolled, isCompact } = this.state;

    const navClass = [
      "navbar",
      isScrolled ? "scrolled" : "",
      isCompact ? "compact" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <nav className={navClass}>
        <div className="navbar-inner" ref={this.innerRef}>
          {/* Branding hanya ikon */}
          <div className="navbar-brand">
            <span
              className="navbar-brand-icon"
              ref={this.brandIconRef}
              aria-hidden="true"
            >
              🌐
            </span>
          </div>

          {/* Toggle button for mobile */}
          <button
            ref={this.toggleRef}
            className={`navbar-toggle ${isOpen ? "open" : ""}`}
            onClick={this.toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            ☰
          </button>

          {/* Navigation links */}
          <ul
            className={`navbar-links ${isOpen ? "open" : ""}`}
            ref={this.linksRef}
          >
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  transitionDelay: isOpen ? `${(index + 1) * 60}ms` : "0ms",
                }}
              >
                <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
