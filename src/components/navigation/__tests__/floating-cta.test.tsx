/**
 * Unit tests for FloatingCTA Component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FloatingCTA from "../floating-cta";

// Mock scroll behavior
Object.defineProperty(window, "scrollY", {
  writable: true,
  value: 0,
});

describe("FloatingCTA", () => {
  beforeEach(() => {
    window.scrollY = 0;
    jest.clearAllMocks();
  });

  it("should not render when scroll position is below threshold", () => {
    window.scrollY = 100; // Below 300px threshold

    render(<FloatingCTA />);

    expect(
      screen.queryByRole("complementary", { name: "Call to action" }),
    ).not.toBeInTheDocument();
  });

  it("should render when scroll position exceeds threshold", async () => {
    window.scrollY = 400; // Above 300px threshold

    render(<FloatingCTA />);

    // Wait for state update
    await waitFor(() => {
      expect(screen.getByText("Hire Me")).toBeInTheDocument();
    });

    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("should have correct ARIA labels", async () => {
    window.scrollY = 400;

    render(<FloatingCTA />);

    await waitFor(() => {
      expect(
        screen.getByLabelText("Hire me - Go to contact section"),
      ).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Download resume")).toBeInTheDocument();
  });

  it("should scroll to contact section when Hire Me is clicked", async () => {
    window.scrollY = 400;

    // Mock getElementById and scrollIntoView
    const mockScrollIntoView = jest.fn();
    const mockContactElement = {
      scrollIntoView: mockScrollIntoView,
    };

    // eslint-disable-next-line testing-library/no-node-access
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockContactElement as any);

    render(<FloatingCTA />);

    await waitFor(() => {
      expect(screen.getByText("Hire Me")).toBeInTheDocument();
    });

    const hireMeButton = screen.getByText("Hire Me");
    fireEvent.click(hireMeButton);

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById).toHaveBeenCalledWith("contact");
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("should call custom onHireMeClick handler when provided", async () => {
    window.scrollY = 400;
    const mockOnHireMeClick = jest.fn();

    render(<FloatingCTA onHireMeClick={mockOnHireMeClick} />);

    await waitFor(() => {
      expect(screen.getByText("Hire Me")).toBeInTheDocument();
    });

    const hireMeButton = screen.getByText("Hire Me");
    fireEvent.click(hireMeButton);

    expect(mockOnHireMeClick).toHaveBeenCalled();
  });

  it("should download resume when Resume is clicked", async () => {
    window.scrollY = 400;

    // Mock createElement and appendChild
    const mockLink = {
      href: "",
      download: "",
      click: jest.fn(),
    };

    const createElementSpy = jest
      .spyOn(document, "createElement")
      .mockReturnValue(mockLink as any);
    const appendChildSpy = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation();
    const removeChildSpy = jest
      .spyOn(document.body, "removeChild")
      .mockImplementation();

    render(<FloatingCTA resumeUrl="/test-resume.pdf" />);

    await waitFor(() => {
      expect(screen.getByText("Resume")).toBeInTheDocument();
    });

    const resumeButton = screen.getByText("Resume");
    fireEvent.click(resumeButton);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(mockLink.href).toBe("/test-resume.pdf");
    expect(mockLink.download).toBe("Ricky_Chen_Resume.pdf");
    expect(mockLink.click).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it("should call custom onDownloadResumeClick handler when provided", async () => {
    window.scrollY = 400;
    const mockOnDownloadResumeClick = jest.fn();

    render(<FloatingCTA onDownloadResumeClick={mockOnDownloadResumeClick} />);

    await waitFor(() => {
      expect(screen.getByText("Resume")).toBeInTheDocument();
    });

    const resumeButton = screen.getByText("Resume");
    fireEvent.click(resumeButton);

    expect(mockOnDownloadResumeClick).toHaveBeenCalled();
  });

  it("should update visibility on scroll", async () => {
    const { rerender } = render(<FloatingCTA />);

    // Initially not visible
    expect(
      screen.queryByRole("complementary", { name: "Call to action" }),
    ).not.toBeInTheDocument();

    // Scroll down
    window.scrollY = 400;
    fireEvent.scroll(window);

    // Wait for state update
    rerender(<FloatingCTA />);

    await waitFor(() => {
      expect(screen.getByText("Hire Me")).toBeInTheDocument();
    });
  });

  it("should cleanup scroll listener on unmount", () => {
    window.scrollY = 400;
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<FloatingCTA />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
