/** @format */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Header from "./index";
import { NAV_ITEMS } from "@/components/common/naveItem";

// Mock Framer motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
    p: ({ children }) => <p>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Logo
vi.mock("@/assets/brand/logo", () => ({
  default: () => <div>Logo</div>,
}));

// Mock Container
vi.mock("@/components/ui/Container", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

// Helper for rendering header
const renderHeader = (props) =>
  render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>
  );

describe("Header", () => {
  it("shows the system name when the sidebar is open", () => {
    renderHeader({ isOpen: true, handleSideBar: vi.fn() });

    expect(screen.getByText(/patient system/i)).toBeInTheDocument();
  });

  it("hides the system name when the sidebar is closed", () => {
    renderHeader({ isOpen: false, handleSideBar: vi.fn() });

    expect(
      screen.queryByText(/patient system/i)
    ).not.toBeInTheDocument();
  });

  it("allows the user to toggle the sidebar from the hamburger button", async () => {
    const user = userEvent.setup();
    const handleSideBar = vi.fn();

    renderHeader({ isOpen: false, handleSideBar });

    await user.click(screen.getByRole("button"));

    expect(handleSideBar).toHaveBeenCalledTimes(1);
  });

  it("always shows the brand logo", () => {
    renderHeader({ isOpen: false, handleSideBar: vi.fn() });

    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("lets the user navigate to all primary sections from the header", () => {
    renderHeader({ isOpen: false, handleSideBar: vi.fn() });

    NAV_ITEMS.forEach(({ title, href }) => {
      const link = screen.getByRole("link", { name: title });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });
});
