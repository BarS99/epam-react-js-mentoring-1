import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

test("should render an input with initial value provided in props", () => {
	render(<SearchForm initSearchQuery={"init value"} onSearch={() => {}} />);

	expect(
		(
			screen.getByPlaceholderText(
				"What do you want to watch?"
			) as HTMLInputElement
		).value
	).toEqual("init value");
});

test("should call onChange prop with a new value after typing to the input and clicking the submit button", () => {
	const onSearchStub = jest.fn();
	render(
		<SearchForm initSearchQuery={"init value"} onSearch={onSearchStub} />
	);

	fireEvent.change(
		screen.getByPlaceholderText(
			"What do you want to watch?"
		) as HTMLInputElement,
		{
			target: { value: "new value" },
		}
	);
	fireEvent.click(screen.getByText("Search") as HTMLButtonElement);

	expect(onSearchStub).toHaveBeenCalledWith("new value");
});

test("should call onChange prop with a new value after typing to the input and clicking enter", () => {
	const onSearchStub = jest.fn();
	render(
		<SearchForm initSearchQuery={"init value"} onSearch={onSearchStub} />
	);
	const inputElement = screen.getByPlaceholderText(
		"What do you want to watch?"
	) as HTMLInputElement;

	fireEvent.change(inputElement, {
		target: { value: "new value" },
	});
	fireEvent.keyDown(inputElement, {
		key: "Enter",
	});

	expect(onSearchStub).toHaveBeenCalledWith("new value");
});
