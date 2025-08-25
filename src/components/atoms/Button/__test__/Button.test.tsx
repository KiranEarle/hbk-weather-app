import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../Button";

describe("Button component", () => {
  it("renders the button with children text", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies the CSS module class", () => {
    render(<Button>Styled Button</Button>);
    const button = screen.getByRole("button", { name: /styled button/i });
    expect(button.className).toContain("button");
  });

  it("fires onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    const button = screen.getByRole("button", { name: /press/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
