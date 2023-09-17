import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("should render initial value provided in props", () => {
	render(<Counter initialValue={5} />);

	expect(
		(screen.getByTitle("Counter value") as HTMLInputElement).value
	).toEqual("5");
});

test("should decrement the initial value provided in props", () => {
	render(<Counter initialValue={5} />);

	fireEvent.click(screen.getByText("Decrement") as HTMLInputElement);

	expect(
		(screen.getByTitle("Counter value") as HTMLInputElement).value
	).toEqual("4");
});

test("should increment the initial value provided in props", () => {
	render(<Counter initialValue={5} />);

	fireEvent.click(screen.getByText("Increment") as HTMLInputElement);

	expect(
		(screen.getByTitle("Counter value") as HTMLInputElement).value
	).toEqual("6");
});
