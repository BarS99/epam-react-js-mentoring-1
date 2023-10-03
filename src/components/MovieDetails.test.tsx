import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { MovieDetailsData } from "../interfaces/movie.interface";

const propsData = {
	poster_path: "image-url",
	title: "Pulp Fiction",
	release_date: "2004",
	vote_average: 8.9,
	runtime: 123,
	genres: ["action", "crime"],
	overview: "Pulp Fiction Description",
	id: 1,
} as MovieDetailsData;

test("should render the component with given data", () => {
	render(<MovieDetails data={propsData} orientation="row" />);

	const image = screen.getByTestId("image");

	expect(image).toHaveAttribute("src", propsData.poster_path);
	expect(image).toHaveAttribute("alt", propsData.title);
	expect(screen.getByTestId("name")).toHaveTextContent(propsData.title);
	expect(screen.getByTestId("release_date")).toHaveTextContent(
		String(propsData.release_date)
	);
	expect(screen.getByTestId("rating")).toHaveTextContent(
		String(propsData.vote_average)
	);
	expect(screen.getByTestId("duration")).toHaveTextContent(
		String(propsData.runtime)
	);
	expect(screen.getByTestId("genres")).toHaveTextContent(
		propsData.genres.join(", ")
	);
	expect(screen.getByTestId("description")).toHaveTextContent(
		propsData.overview
	);
});

describe("orientation", () => {
	test("should have a correct class for row orientation", () => {
		render(<MovieDetails data={propsData} orientation="row" />);

		expect(screen.getByTestId("item")).toHaveClass("movie-details--row");
	});

	test("should have a correct class for column orientation", () => {
		render(<MovieDetails data={propsData} orientation="column" />);

		expect(screen.getByTestId("item")).toHaveClass("movie-details--column");
	});
});
