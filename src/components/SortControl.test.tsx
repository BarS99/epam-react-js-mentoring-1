import { fireEvent, render, screen } from "@testing-library/react";
import SortControl from "./SortControl";

const options = [
	{ id: '1', value: "Release Date" },
	{ id: '2', value: "title" },
];

test("should render the component with given data", () => {
	const onChangeStub = jest.fn();

	render(
		<SortControl options={options} selection={'1'} onChange={onChangeStub} />
	);

	expect(screen.getByTestId("label")).toHaveTextContent("Sort By");
	expect(
		(
			Array.from(
				screen.getByTestId("select").childNodes
			) as HTMLOptionElement[]
		).every((item) =>
			options.map((item) => item.id).includes(item.value)
		)
	).toBe(true);
	expect(screen.getByTestId("select")).toHaveValue('1');
});

test("should execute the callback function when the selection changes", () => {
	const onChangeStub = jest.fn();

	render(
		<SortControl options={options} selection={'1'} onChange={onChangeStub} />
	);

	fireEvent.change(screen.getByTestId("select") as HTMLSelectElement, {
		target: { value: '1' },
	});

	expect(onChangeStub).toHaveBeenCalledWith('1');
});
