/**
 * Print Button Component
 * Professional print functionality
 */

import React, { Component, ReactNode } from "react";
import "../../assets/css/print-button.css";

interface PrintButtonProps {
  className?: string;
  showLabel?: boolean;
}

class PrintButton extends Component<PrintButtonProps> {
  private handlePrint = (): void => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  render(): ReactNode {
    const { className = "", showLabel = false } = this.props;

    return (
      <button
        className={`print-button ${className}`.trim()}
        onClick={this.handlePrint}
        type="button"
        aria-label="Print page"
        title="Print this page (Ctrl+P)"
      >
        <span className="print-icon" aria-hidden="true">
          🖨️
        </span>
        {showLabel && <span className="print-label">Print</span>}
      </button>
    );
  }
}

export default PrintButton;
