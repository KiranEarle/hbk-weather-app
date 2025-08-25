import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../Select";

describe("Select component", () => {
  it("renders options", () => {
    render(<Select options={["Option 1", "Option 2"]} />);
    const option1 = screen.getByRole("option", { name: "Option 1" });
    const option2 = screen.getByRole("option", { name: "Option 2" });
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("calls onChange when value is selected", async () => {
    const handleChange = jest.fn();
    render(
      <Select options={["Option 1", "Option 2"]} onChange={handleChange} />
    );
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "Option 2");
    expect(handleChange).toHaveBeenCalled();
    expect(select).toHaveValue("Option 2");
  });
});
