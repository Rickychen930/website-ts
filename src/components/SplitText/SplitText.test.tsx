import React from "react";
import { render, screen } from "@testing-library/react";
import { SplitText } from "./SplitText";

describe("SplitText", () => {
  it("renders full text for screen readers via aria-label", () => {
    render(<SplitText text="Quantum Nexus" />);
    expect(screen.getByLabelText("Quantum Nexus")).toBeInTheDocument();
  });

  it("renders plain text when input is whitespace-only", () => {
    render(<SplitText text="   " as="h1" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.tagName).toBe("H1");
  });
});
