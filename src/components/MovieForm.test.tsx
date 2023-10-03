import { fireEvent, render, screen } from "@testing-library/react";
import { MovieForm } from "./MovieForm";

const genres = ["Action", "Crime", "Drama"];

test("should call the callback when submitted", () => {
	const onSubmitStub = jest.fn();

	render(<MovieForm onSubmit={onSubmitStub} genres={genres} />);

	fireEvent.submit(screen.getByTestId("form"));

	expect(onSubmitStub).toHaveBeenCalled();
});

describe("should create the form", () => {
	test("with empty data", () => {
		render(<MovieForm onSubmit={() => {}} genres={genres} />);

		fireEvent.click(screen.getByTestId("genre"));

		expect((screen.getByTestId("date") as HTMLInputElement).value).toBe("");
		expect((screen.getByTestId("overview") as HTMLInputElement).value).toBe(
			""
		);
		expect((screen.getByTestId("rating") as HTMLInputElement).value).toBe(
			""
		);
		expect((screen.getByTestId("runtime") as HTMLInputElement).value).toBe(
			""
		);
		expect(
			(
				screen.getAllByTestId("selectedGenres") as HTMLInputElement[]
			).every((item) => !item.checked)
		).toBe(true);
		expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
			""
		);
		expect((screen.getByTestId("url") as HTMLInputElement).value).toBe("");
	});

	test("with filled data", () => {
		const dataMock = {
			date: "2004-01-01",
			selectedGenres: ["Action", "Crime"],
			overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men...`,
			rating: "8.9",
			runtime: "2h 34min",
			title: "Pulp Fiction",
			url: "https://www.imdb.com/title/tt0110912/",
		};

		render(
			<MovieForm onSubmit={() => {}} data={dataMock} genres={genres} />
		);

		fireEvent.click(screen.getByTestId("genre"));

		expect((screen.getByTestId("date") as HTMLInputElement).value).toBe(
			dataMock.date
		);
		expect((screen.getByTestId("overview") as HTMLInputElement).value).toBe(
			dataMock.overview
		);
		expect((screen.getByTestId("rating") as HTMLInputElement).value).toBe(
			dataMock.rating
		);
		expect((screen.getByTestId("runtime") as HTMLInputElement).value).toBe(
			dataMock.runtime
		);
		expect(
			(
				screen.getAllByTestId("selectedGenres") as HTMLInputElement[]
			).every((item) =>
				dataMock.selectedGenres.includes(item.id) ? item.checked : true
			)
		).toBe(true);
		expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
			dataMock.title
		);
		expect((screen.getByTestId("url") as HTMLInputElement).value).toBe(
			dataMock.url
		);
	});
});
