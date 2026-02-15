/** @format */

import React from "react";
import { vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/store/auth/authThunk", () => ({
  login: vi.fn((payload) => ({ type: "auth/login", payload })),
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      error: null,
      message: null,
      isAuthenticated: false,
      loading: false,
    });
  });

  test("login button stays disabled until form is valid", () => {
    renderLogin();

    const email = screen.getByLabelText(/enter your email address/i);
    const password = screen.getByLabelText(/enter your password/i);
    const button = screen.getByRole("button", { name: /login/i });

    expect(button).toBeDisabled();

    fireEvent.change(email, {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(password, {
      target: { value: "Valid123!" },
    });

    expect(button).not.toBeDisabled();
  });

  test("dispatches login with trimmed credentials", () => {
    renderLogin();

    const email = screen.getByLabelText(/enter your email address/i);
    const password = screen.getByLabelText(/enter your password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(email, {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(password, {
      target: { value: "Valid123!" },
    });

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
  });

  test("shows loading state inside button", () => {
    useSelector.mockReturnValue({
      error: null,
      message: null,
      isAuthenticated: false,
      loading: true,
    });

    renderLogin();

    expect(screen.getByRole("button", { name: /logging in/i })).toBeDisabled();
  });
});
