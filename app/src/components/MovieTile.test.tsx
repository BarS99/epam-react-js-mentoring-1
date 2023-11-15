import { fireEvent, render, screen } from "@testing-library/react";
import MovieTile from "./MovieTile";
import { Movie } from "../interfaces/movie.interface";

const propsData = {
	genres: ["action", "crime"],
	id: 123,
	overview: "",
	poster_path: "image-url",
	release_date: "2004",
	runtime: 123,
	title: "Pulp Fiction",
} as Movie;
const onClickStub = jest.fn();
const onEditStub = jest.fn();
const onDeleteStub = jest.fn();

test("should render the component with given data", () => {
	render(
		<MovieTile
			data={propsData}
			onClick={onClickStub}
			onEdit={onEditStub}
			onDelete={onDeleteStub}
		/>
	);

	const image = screen.getByTestId("image");

	expect(image).toHaveAttribute("src", propsData.poster_path);
	expect(image).toHaveAttribute("alt", propsData.title);
	expect(screen.getByTestId("name")).toHaveTextContent(propsData.title);
	expect(screen.getByTestId("year")).toHaveTextContent(
		propsData.release_date ?? ""
	);
	expect(screen.getByTestId("genres")).toHaveTextContent(
		propsData.genres.join(", ")
	);
	expect(screen.getByTestId("link")).toHaveTextContent(propsData.title);
});

test("should execute a callback when clicked", () => {
	render(
		<MovieTile
			data={propsData}
			onClick={onClickStub}
			onEdit={onEditStub}
			onDelete={onDeleteStub}
		/>
	);

	fireEvent.click(screen.getByTestId("context-open"));
	fireEvent.click(screen.getByTestId("edit"));

	expect(onEditStub).toHaveBeenCalled();
});

describe("context menu", () => {
	test("should execute a callback when edit option in context menu clicked", () => {
		render(
			<MovieTile
				data={propsData}
				onClick={onClickStub}
				onEdit={onEditStub}
				onDelete={onDeleteStub}
			/>
		);

		fireEvent.click(screen.getByTestId("context-open"));
		fireEvent.click(screen.getByTestId("delete"));

		expect(onDeleteStub).toHaveBeenCalled();
	});

	test("should open a context menu when the open context button clicked and close it when the context close button clicked", () => {
		render(
			<MovieTile
				data={propsData}
				onClick={onClickStub}
				onEdit={onEditStub}
				onDelete={onDeleteStub}
			/>
		);

		expect(screen.queryByTestId("context")).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId("context-open"));

		expect(screen.getByTestId("context")).toBeInTheDocument();

		fireEvent.click(screen.getByTestId("context-close"));

		expect(screen.queryByTestId("context")).not.toBeInTheDocument();
	});

	test("should open a context menu when the open context button clicked and close it when the mouse leaves the context menu", () => {
		render(
			<MovieTile
				data={propsData}
				onClick={onClickStub}
				onEdit={onEditStub}
				onDelete={onDeleteStub}
			/>
		);

		expect(screen.queryByTestId("context")).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId("context-open"));

		expect(screen.getByTestId("context")).toBeInTheDocument();

		fireEvent.mouseLeave(screen.getByTestId("context"));

		expect(screen.queryByTestId("context")).not.toBeInTheDocument();
	});
});
