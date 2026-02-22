/** @format */

import React from "react";
import { vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import BookAppointment from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/store/doctor/doctorThunk", () => ({
  getAllDepartments: vi.fn(() => ({ type: "doctor/getAll" })),
}));

vi.mock("@/store/appointment/appointmentThunk", () => ({
  bookAppointment: vi.fn(() => ({
    unwrap: () => Promise.resolve(),
  })),
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-select", () => ({
  default: ({ options, onChange }) => (
    <select
      data-testid="department-select"
      onChange={(e) => {
        const selected = options.find((o) => o.value === e.target.value);
        onChange(selected);
      }}
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");
const { getAllDepartments } = await import("@/store/doctor/doctorThunk");

function renderPage() {
  return render(
    <MemoryRouter>
      <BookAppointment />
    </MemoryRouter>,
  );
}

describe("BookAppointment", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      departments: [{ _id: "1", department: "Cardiology" }],
      loading: false,
      error: null,
    });
  });

  test("fetches departments on mount", () => {
    renderPage();

    expect(mockDispatch).toHaveBeenCalledWith(getAllDepartments());
  });

  test("shows loading state", () => {
    useSelector.mockReturnValue({
      departments: [],
      loading: true,
      error: null,
    });

    renderPage();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("shows error state", () => {
    useSelector.mockReturnValue({
      departments: [],
      loading: false,
      error: "Failed to load",
    });

    renderPage();

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  test("book button stays disabled until form is valid", () => {
    renderPage();

    const button = screen.getByRole("button", { name: /book/i });
    const dateInput = screen.getByLabelText(/select date and time/i);

    expect(button).toBeDisabled();

    fireEvent.change(dateInput, {
      target: { value: "2099-12-31T10:00" },
    });

    fireEvent.blur(dateInput);

    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "1" },
    });

    expect(button).not.toBeDisabled();
  });

  test("submits form and dispatches booking", async () => {
    renderPage();

    const dateInput = screen.getByLabelText(/select date and time/i);

    fireEvent.change(dateInput, {
      target: { value: "2099-12-31T10:00" },
    });

    fireEvent.blur(dateInput);

    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /book/i }));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        unwrap: expect.any(Function),
      }),
    );
  });
});
