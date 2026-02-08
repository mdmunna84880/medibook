import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render 'Application' in any case", () => {
    render(<App />);

    const heading = screen.getByRole("heading", {
      name: /application/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
