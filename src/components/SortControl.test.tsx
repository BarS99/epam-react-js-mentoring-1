import { fireEvent, render, screen } from "@testing-library/react";
import SortControl from "./SortControl";

const options = ["Release date", "Title"];

test("should render the component with given data", () => {
	const onChangeStub = jest.fn();

	render(
		<SortControl
			options={options}
			selection="Release date"
			onChange={onChangeStub}
		/>
	);

	expect(screen.getByTestId("label")).toHaveTextContent("Sort By");
	expect(
		(
			Array.from(
				screen.getByTestId("select").childNodes
			) as HTMLOptionElement[]
		).every((item) => options.includes(item.value))
	).toBe(true);
	expect(screen.getByTestId("select")).toHaveValue("Release date");
});

test("should execute the callback function when the selection changes", () => {
	const onChangeStub = jest.fn();

	render(
		<SortControl
			options={options}
			selection="Release date"
			onChange={onChangeStub}
		/>
	);

	fireEvent.change(screen.getByTestId("select") as HTMLSelectElement, {
		target: { value: "Title" },
	});

	expect(onChangeStub).toHaveBeenCalledWith("Title");
});
