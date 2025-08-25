import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DebouncedInput from "../DebouncedInput";

jest.useFakeTimers();

describe("DebouncedInput", () => {
  it("calls onChange after debounce delay", async () => {
    const handleChange = jest.fn();

    render(
      <DebouncedInput
        value=""
        onChange={handleChange}
        debounce={500}
        placeholder="Type here"
      />
    );

    const input = screen.getByPlaceholderText("Type here");
    await userEvent.type(input, "hello");

    expect(handleChange).not.toHaveBeenCalled();
    jest.advanceTimersByTime(400);
    expect(handleChange).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(handleChange).toHaveBeenCalledWith("hello");
  });

  it("resets timer if typing continues", async () => {
    const handleChange = jest.fn();

    render(
      <DebouncedInput
        value=""
        onChange={handleChange}
        debounce={500}
        placeholder="Search"
      />
    );

    const input = screen.getByPlaceholderText("Search");
    await userEvent.type(input, "he");
    jest.advanceTimersByTime(300);
    await userEvent.type(input, "llo");
    jest.advanceTimersByTime(500);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("hello");
  });
});
