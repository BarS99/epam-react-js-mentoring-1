import { fireEvent, render, screen } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

const actionGenre = "action";
const genres = [actionGenre, "horror", "romance"];

test("should render all genres passed in props", () => {
	let selectedGenre: string | null = null;
	let onSelectStub = jest.fn();

	render(
		<GenreSelect
			genres={genres}
			selectedGenre={selectedGenre}
			onSelect={onSelectStub}
		/>
	);

	const genreItems = screen.getAllByTestId(/genre-(.*)/i);

	expect(
		genreItems.every((item) => genres.includes(item.textContent as string))
	).toBe(true);
});

test("should highlight a selected genre passed in props", () => {
	let selectedGenre: string | null = actionGenre;
	let onSelectStub = jest.fn();

	render(
		<GenreSelect
			genres={genres}
			selectedGenre={selectedGenre}
			onSelect={onSelectStub}
		/>
	);

	expect(
		(
			screen.queryAllByTestId(`genre-button`)[0] as HTMLButtonElement
		).classList.contains("genre-select__button--selected")
	).toBe(true);
});

test("should call onSelect with proper arguments after button click event", () => {
	let selectedGenre: string | null = null;
	let onSelectStub = jest.fn();
	render(
		<GenreSelect
			genres={genres}
			selectedGenre={selectedGenre}
			onSelect={onSelectStub}
		/>
	);

	fireEvent.click(screen.queryAllByTestId(`genre-button`)[0] as HTMLButtonElement);

	expect(onSelectStub).toHaveBeenCalledWith(actionGenre);
});
