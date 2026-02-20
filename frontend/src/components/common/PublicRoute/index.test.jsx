/** @format */

import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PublicRoute from "./index";

// Mock useSelecter and useDispatch
const { mockUseSelector, mockDispatch } = vi.hoisted(() => ({
  mockUseSelector: vi.fn(),
  mockDispatch: vi.fn(),
}));

// Use mock useSelecter and useDispatch
vi.mock("react-redux", () => ({
  useSelector: mockUseSelector,
  useDispatch: () => mockDispatch,
}));

// Mock loading
vi.mock("@/components/common/Loading", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

// Mock react-toastify success message
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock clearAuthMsgErr
vi.mock("@/store/auth/authSlice", () => ({
  clearAuthMsgErr: () => ({ type: "auth/clearAuthMsgErr" }),
}));

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
      message: null,
    });

    render(
      <MemoryRouter>
        <PublicRoute>
          <div>Login Page</div>
        </PublicRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });

  test("redirects authenticated user to dashboard", () => {
    mockUseSelector.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      message: null,
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
      message: null,
    });

    renderAtPublicRoute(
      <PublicRoute>
        <div>Login Page</div>
      </PublicRoute>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});