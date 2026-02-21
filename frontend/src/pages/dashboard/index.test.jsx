/** @format */

import React from "react";
import { vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Dashboard from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );
}

describe("Dashboard", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      user: {
        name: "Munna",
      },
      loading: false,
      error: null,
    });
  });

  test("renders dashboard heading", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", { name: /dashboard/i }),
    ).toBeInTheDocument();
  });

  test("displays logged in user name", () => {
    renderDashboard();

    const nameInput = screen.getByLabelText(/enter your name/i);
    expect(nameInput).toHaveValue("Munna");
  });

  test("shows loading state", () => {
    useSelector.mockReturnValue({
      user: null,
      loading: true,
      error: null,
    });

    renderDashboard();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("shows error message if present", () => {
    useSelector.mockReturnValue({
      user: null,
      loading: false,
      error: "Something went wrong",
    });

    renderDashboard();

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("dispatches action on mount if required", () => {
    renderDashboard();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
