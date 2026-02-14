/** @format */

import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./index";

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

// Helper components to simulate routing like the real app
function renderAtProtectedRoute(ui, initialPath = "/dashboard") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/auth/login" element={<div>Login Page</div>} />
        <Route path="/dashboard" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  test("shows the loader while we are still figuring out the auth state", () => {
    mockUseSelector.mockReturnValue({
      loading: true,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Secret Dashboard</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(
      screen.queryByText("Secret Dashboard")
    ).not.toBeInTheDocument();
  });

  test("kicks unauthenticated users to the login screen", () => {
    mockUseSelector.mockReturnValue({
      loading: false,
      isAuthenticated: false,
    });

    renderAtProtectedRoute(
      <ProtectedRoute>
        <div>Secret Dashboard</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("lets authenticated users see the protected content", () => {
    mockUseSelector.mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    renderAtProtectedRoute(
      <ProtectedRoute>
        <div>Secret Dashboard</div>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Secret Dashboard")
    ).toBeInTheDocument();
  });
});
