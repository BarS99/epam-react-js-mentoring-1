import { fireEvent, render, screen } from "@testing-library/react";
import MovieTile from "./MovieTile";

const propsData = {
	image: {
		url: "image-url",
		altText: "image-alt",
	},
	name: "Pulp Fiction",
	year: 2004,
	genres: ["action", "crime"],
};
const onClickStub = jest.fn();

test("should render the component with given data", () => {
	render(<MovieTile data={propsData} onClick={onClickStub} />);

	const image = screen.getByTestId("image");

	expect(image).toHaveAttribute("src", propsData.image.url);
	expect(image).toHaveAttribute("alt", propsData.image.altText);
	expect(screen.getByTestId("name")).toHaveTextContent(propsData.name);
	expect(screen.getByTestId("year")).toHaveTextContent(
		String(propsData.year)
	);
	expect(screen.getByTestId("genres")).toHaveTextContent(
		propsData.genres.join(", ")
	);
	expect(screen.getByTestId("link")).toHaveTextContent(propsData.name);
});

test("should execute a callback when clicked", () => {
	render(<MovieTile data={propsData} onClick={onClickStub} />);

	fireEvent.click(screen.getByTestId("link"));

	expect(onClickStub).toHaveBeenCalled();
});
