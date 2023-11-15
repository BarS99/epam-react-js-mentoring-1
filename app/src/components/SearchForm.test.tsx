import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

test("should render an input with initial value provided in props", () => {
	render(<SearchForm initSearchQuery={"init value"} onSearch={() => {}} />);

	expect((screen.getByTestId("input") as HTMLInputElement).value).toEqual(
		"init value"
	);
});

test("should call onChange prop with a new value after typing to the input and clicking the submit button", () => {
	const onSearchStub = jest.fn();
	render(
		<SearchForm initSearchQuery={"init value"} onSearch={onSearchStub} />
	);

	fireEvent.change(screen.getByTestId("input") as HTMLInputElement, {
		target: { value: "new value" },
	});
	fireEvent.submit(screen.getByTestId("form") as HTMLButtonElement);

	expect(onSearchStub).toHaveBeenCalledWith("new value");
});

test("should call onChange prop with a new value after typing to the input and clicking enter", () => {
	const onSearchStub = jest.fn();
	render(
		<SearchForm initSearchQuery={"init value"} onSearch={onSearchStub} />
	);
	const inputElement = screen.getByTestId("input") as HTMLInputElement;

	fireEvent.change(inputElement, {
		target: { value: "new value" },
	});
	fireEvent.keyDown(inputElement, {
		key: "Enter",
	});

	expect(onSearchStub).toHaveBeenCalledWith("new value");
});
