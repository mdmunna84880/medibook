/** @format */

import React from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignUp from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/store/auth/authThunk", () => ({
  signup: vi.fn((payload) => ({ type: "auth/signup", payload })),
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");

function renderSignUp() {
  return render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>,
  );
}

describe("SignUp", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      error: null,
      message: null,
      isAuthenticated: false,
      loading: false,
    });
  });

  test("signup button stays disabled until form is valid", () => {
    renderSignUp();

    const name = screen.getByLabelText(/enter your name/i);
    const email = screen.getByLabelText(/enter your email address/i);
    const password = screen.getByLabelText(/enter your password/i);
    const button = screen.getByRole("button", { name: /login/i });

    expect(button).toBeDisabled();

    fireEvent.change(name, {
      target: { value: "Md Munna" },
    });

    fireEvent.change(email, {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(password, {
      target: { value: "Valid123!" },
    });

    expect(button).not.toBeDisabled();
  });

  test("dispatches signup on submit", () => {
    renderSignUp();

    const name = screen.getByLabelText(/enter your name/i);
    const email = screen.getByLabelText(/enter your email address/i);
    const password = screen.getByLabelText(/enter your password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(name, {
      target: { value: "Md Munna" },
    });

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

    renderSignUp();

    expect(screen.getByRole("button", { name: /signing up/i })).toBeDisabled();
  });
});
