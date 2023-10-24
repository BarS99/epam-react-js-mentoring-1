import styles from "./GenreSelect.module.css";

interface Props {
	genres: string[];
	selectedGenre: string | null;
	onSelect: (genre: string) => void;
}

const GenreSelect = ({ genres, selectedGenre, onSelect }: Props) => {
	return (
		<ul className={styles["genre-select"]} data-cy="genre-select">
			{genres.map((genre) => (
				<li className={styles["genre-select__item"]} key={genre}>
					<button
						className={[
							styles["genre-select__button"],
							genre === selectedGenre &&
								styles["genre-select__button--selected"],
						].join(" ")}
						onClick={() => onSelect(genre)}
						type="button"
						data-testid="genre-button"
						aria-pressed={genre === selectedGenre}
					>
						{genre}
					</button>
				</li>
			))}
		</ul>
	);
};

export default GenreSelect;
