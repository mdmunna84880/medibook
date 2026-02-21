/** @format */

import React from "react";
import { vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { within } from "@testing-library/react";
import MyAppointment from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/store/appointment/appointmentThunk", () => ({
  getAllAppointments: vi.fn((year) => ({
    type: "appointment/getAll",
    payload: year,
  })),
  getAllDistinctYear: vi.fn(() => ({
    type: "appointment/getYears",
  })),
}));

vi.mock("@/components/common/Loading", () => ({
  default: () => <p>Loading...</p>,
}));

vi.mock("@/components/common/Error", () => ({
  default: ({ error }) => <p>{error}</p>,
}));

vi.mock("react-select", () => ({
  default: ({ options, value, onChange }) => (
    <select
      data-testid="year-select"
      value={value?.value ?? ""}
      onChange={(e) => {
        const selected = options.find(
          (o) => String(o.value) === e.target.value,
        );
        onChange(selected || null);
      }}
    >
      {options.map((o) => (
        <option key={o.label} value={o.value ?? ""}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");
const { getAllAppointments, getAllDistinctYear } =
  await import("@/store/appointment/appointmentThunk");

function renderPage() {
  return render(
    <MemoryRouter>
      <MyAppointment />
    </MemoryRouter>,
  );
}

describe("MyAppointment", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      appointments: [],
      isError: false,
      message: "",
      loading: false,
      yearsWithId: [],
    });
  });

  test("dispatches year list and appointments on mount", () => {
    renderPage();

    expect(mockDispatch).toHaveBeenCalledWith(getAllDistinctYear());
    expect(mockDispatch).toHaveBeenCalledWith(getAllAppointments(null));
  });

  test("shows loading state", () => {
    useSelector.mockReturnValue({
      appointments: [],
      isError: false,
      message: "",
      loading: true,
      yearsWithId: [],
    });

    renderPage();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("shows error state", () => {
    useSelector.mockReturnValue({
      appointments: [],
      isError: true,
      message: "Failed to load",
      loading: false,
      yearsWithId: [],
    });

    renderPage();

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  test("renders appointment data", () => {
    useSelector.mockReturnValue({
      loading: false,
      isError: false,
      message: "",
      yearsWithId: [],
      appointments: [
        {
          _id: "1",
          appointmentAt: new Date().toISOString(),
          doctorId: { name: "Dr. Strange", department: "Neuro", rating: 5 },
          userId: { name: "Munna", email: "munna@test.com" },
        },
      ],
    });

    renderPage();

    expect(screen.getByText(/dr\. strange/i)).toBeInTheDocument();

    const patientSection = screen.getByText(/patient detail/i).closest("div");

    expect(within(patientSection).getByText(/^munna$/i)).toBeInTheDocument();
  });

  test("changing year refetches appointments", () => {
    useSelector.mockReturnValue({
      appointments: [],
      isError: false,
      message: "",
      loading: false,
      yearsWithId: [{ year: 2024 }],
    });

    renderPage();

    fireEvent.change(screen.getByTestId("year-select"), {
      target: { value: "2024" },
    });

    expect(mockDispatch).toHaveBeenCalledWith(getAllAppointments(2024));
  });
});
