/** @format */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import SideBar from "./index";
import { logout } from "@/store/auth/authThunk";
import { NAV_ITEMS } from "@/components/common/naveItem";

let mockUser = {
  name: "Md Munna",
  avatar: "avatar.png",
};

const mockDispatch = vi.fn();

// Mock readux
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({
      auth: { user: mockUser },
    }),
}));

// Mock tooltip
vi.mock("react-tooltip", () => ({
  Tooltip: () => null,
}));

// Mock logout
vi.mock("@/store/auth/authThunk", () => ({
  logout: vi.fn(() => ({ type: "auth/logout" })),
}));

// Mock the framer motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
  },
}));

// Render side bar
const renderComponent = () =>
  render(
    <MemoryRouter>
      <SideBar />
    </MemoryRouter>
  );

describe("SideBar", () => {
  beforeEach(() => {
    mockDispatch.mockClear();

    mockUser = {
      name: "Md Munna",
      avatar: "avatar.png",
    };
  });

  it("shows the logged-in user's name and avatar", () => {
    renderComponent();

    expect(
      screen.getByRole("img", { name: /user name/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Md Munna")).toBeInTheDocument();
  });

  it("falls back to the user's initial when no avatar is available", () => {
    mockUser = { name: "Munna", avatar: "" };

    renderComponent();

    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("lets the user navigate to all main sections from the sidebar", () => {
    renderComponent();

    NAV_ITEMS.forEach(({ title, href }) => {
      const link = screen.getByRole("link", { name: title });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("provides a quick way to open the profile page", () => {
    renderComponent();

    const profileLink = screen.getByRole("link", { name: /patient/i });

    expect(profileLink).toHaveAttribute("href", "/");
  });

  it("logs the user out when they choose to sign out", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: /log out/i }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(logout).toHaveBeenCalled();
  });
});
