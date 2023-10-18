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

test("should render the component with given data", () => {
	render(<MovieTile data={propsData} onClick={onClickStub} />);

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
	render(<MovieTile data={propsData} onClick={onClickStub} />);

	fireEvent.click(screen.getByTestId("link"));

	expect(onClickStub).toHaveBeenCalled();
});
