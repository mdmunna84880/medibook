/** @format */

import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PublicRoute from "./index";

// Mock redux
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

// Mock loading
vi.mock("./Loading", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

// Mock use selector
const mockUseSelector = await import("react-redux").then(
  (m) => m.useSelector
);

function renderAtPublicRoute(ui, initialPath = "/auth/login") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/auth/login" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe("PublicRoute", () => {
  test("shows loader while auth state is resolving", () => {
    mockUseSelector.mockReturnValue({
      loading: true,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <PublicRoute>
          <div>Login Page</div>
        </PublicRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });

  test("redirects authenticated user to dashboard", () => {
    mockUseSelector.mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    renderAtPublicRoute(
      <PublicRoute>
        <div>Login Page</div>
      </PublicRoute>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("renders public content when user is not authenticated", () => {
    mockUseSelector.mockReturnValue({
      loading: false,
      isAuthenticated: false,
    });

    renderAtPublicRoute(
      <PublicRoute>
        <div>Login Page</div>
      </PublicRoute>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
