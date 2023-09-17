import styles from "./GenreSelect.module.scss";

interface Props {
	genres: string[];
	selectedGenre: string | null;
	onSelect: (genre: string) => void;
}

const GenreSelect = ({ genres, selectedGenre, onSelect }: Props) => {
	return (
		<ul className={styles["genre-select"]}>
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
						data-testid={`genre-${genre}`}
					>
						{genre}
					</button>
				</li>
			))}
		</ul>
	);
};

export default GenreSelect;
