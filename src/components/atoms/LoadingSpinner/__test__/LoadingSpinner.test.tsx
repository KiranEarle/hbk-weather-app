import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

jest.mock("../../../../../public/spinner.svg", () => {
  return <svg data-testid="spinner-svg" />;
});

describe("LoadingSpinner", () => {
  it("renders the spinner SVG", () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId("spinner-svg");
    expect(svg).toBeInTheDocument();
  });
});
