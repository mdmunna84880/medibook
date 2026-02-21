/** @format */

import React from "react";
import { vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Services from "./index";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@/store/service/serviceThunk", () => ({
  getAllServices: vi.fn(() => ({ type: "service/getAll" })),
}));

vi.mock("@/components/common/Error", () => ({
  default: ({ error }) => <p>{error}</p>,
}));

vi.mock("@/components/common/Loading", () => ({
  default: () => <p>Loading services...</p>,
}));

const mockDispatch = vi.fn();

const { useDispatch, useSelector } = await import("react-redux");
const { getAllServices } = await import("@/store/service/serviceThunk");

function renderServices() {
  return render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>,
  );
}

describe("Services", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({
      services: [],
      loading: false,
      error: null,
    });
  });

  test("requests all services when the page opens", () => {
    renderServices();

    expect(mockDispatch).toHaveBeenCalledWith(getAllServices());
  });

  test("shows a loading state while services are being fetched", () => {
    useSelector.mockReturnValue({
      services: [],
      loading: true,
      error: null,
    });

    renderServices();

    expect(
      screen.getByText(/loading services/i),
    ).toBeInTheDocument();
  });

  test("shows a meaningful error if something goes wrong", () => {
    useSelector.mockReturnValue({
      services: [],
      loading: false,
      error: "Failed to load services",
    });

    renderServices();

    expect(
      screen.getByText(/failed to load services/i),
    ).toBeInTheDocument();
  });

  test("shows the services heading when data is ready", () => {
    useSelector.mockReturnValue({
      services: [],
      loading: false,
      error: null,
    });

    renderServices();

    expect(
      screen.getByRole("heading", {
        name: /services offered by us/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders every service as a card the user can read", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      services: [
        {
          _id: "1",
          name: "Dental Care",
          description: "Complete dental solutions",
          icon: "/dental.png",
        },
        {
          _id: "2",
          name: "Cardiology",
          description: "Heart specialist consultation",
          icon: "/cardio.png",
        },
      ],
    });

    renderServices();

    expect(screen.getByText(/dental care/i)).toBeInTheDocument();
    expect(
      screen.getByText(/complete dental solutions/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/cardiology/i)).toBeInTheDocument();
    expect(
      screen.getByText(/heart specialist consultation/i),
    ).toBeInTheDocument();
  });

  test("renders service images with accessible alt text", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      services: [
        {
          _id: "1",
          name: "Neurology",
          description: "Brain and nerves care",
          icon: "/neuro.png",
        },
      ],
    });

    renderServices();

    expect(
      screen.getByRole("img", { name: /neurology/i }),
    ).toBeInTheDocument();
  });
});