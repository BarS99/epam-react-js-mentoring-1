import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";

const propsData = {
	image: {
		url: "image-url",
		altText: "image-alt",
	},
	name: "Pulp Fiction",
	year: 2004,
	rating: 8.9,
	duration: "2h 34min",
	genres: ["action", "crime"],
	description: "Pulp Fiction Description",
};

test("should render the component with given data", () => {
	render(<MovieDetails data={propsData} orientation="row" />);

	const image = screen.getByTestId("image");

	expect(image).toHaveAttribute("src", propsData.image.url);
	expect(image).toHaveAttribute("alt", propsData.image.altText);
	expect(screen.getByTestId("name")).toHaveTextContent(propsData.name);
	expect(screen.getByTestId("year")).toHaveTextContent(
		String(propsData.year)
	);
	expect(screen.getByTestId("rating")).toHaveTextContent(
		String(propsData.rating)
	);
	expect(screen.getByTestId("duration")).toHaveTextContent(
		propsData.duration
	);
	expect(screen.getByTestId("genres")).toHaveTextContent(
		propsData.genres.join(", ")
	);
	expect(screen.getByTestId("description")).toHaveTextContent(
		propsData.description
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
