import { fireEvent, render, screen } from "@testing-library/react";
import { MovieForm } from "./MovieForm";
import { MovieFormData } from "../interfaces/movie.interface";

const genres = ["Action", "Crime", "Drama"];

describe("should create the form", () => {
	test("with empty data", () => {
		render(<MovieForm onSubmit={() => {}} genres={genres} />);

		fireEvent.click(screen.getByTestId("genre"));

		expect(
			(screen.getByTestId("release_date") as HTMLInputElement).value
		).toBe("");
		expect((screen.getByTestId("overview") as HTMLInputElement).value).toBe(
			""
		);
		expect(
			(screen.getByTestId("vote_average") as HTMLInputElement).value
		).toBe("");
		expect((screen.getByTestId("runtime") as HTMLInputElement).value).toBe(
			""
		);
		expect(
			(screen.getAllByTestId("genres") as HTMLInputElement[]).every(
				(item) => !item.checked
			)
		).toBe(true);
		expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
			""
		);
		expect(
			(screen.getByTestId("poster_path") as HTMLInputElement).value
		).toBe("");
	});

	test("with filled data and trigger callback when submitted with valid data", () => {
		const dataMock = {
			release_date: "2004-01-01",
			genres: ["Action", "Crime"],
			overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men...`,
			vote_average: "8.9",
			runtime: "2h 34min",
			title: "Pulp Fiction",
			poster_path: "https://www.imdb.com/title/tt0110912/",
		} as MovieFormData;

		render(
			<MovieForm onSubmit={() => {}} data={dataMock} genres={genres} />
		);

		fireEvent.click(screen.getByTestId("genre"));

		expect(
			(screen.getByTestId("release_date") as HTMLInputElement).value
		).toBe(dataMock.release_date);
		expect((screen.getByTestId("overview") as HTMLInputElement).value).toBe(
			dataMock.overview
		);
		expect(
			(screen.getByTestId("vote_average") as HTMLInputElement).value
		).toBe(dataMock.vote_average);
		expect((screen.getByTestId("runtime") as HTMLInputElement).value).toBe(
			dataMock.runtime
		);
		expect(
			(screen.getAllByTestId("genres") as HTMLInputElement[]).every(
				(item) =>
					dataMock.genres.includes(item.id) ? item.checked : true
			)
		).toBe(true);
		expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
			dataMock.title
		);
		expect(
			(screen.getByTestId("poster_path") as HTMLInputElement).value
		).toBe(dataMock.poster_path);
	});
});
