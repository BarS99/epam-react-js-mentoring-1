import styles from "./GenreSelect.module.scss";

interface Props {
	genres: string[];
	selectedGenre: string | null;
	onSelect: (genre: string) => void;
}

const GenreSelect = (props: Props) => {
	const getButtonClasses = (genre: string): string => {
		const classes = [styles["genre-select__button"]];

		if (genre === props.selectedGenre) {
			classes.push(styles["genre-select__button--selected"]);
		}

		return classes.join(" ");
	};

	return (
		<ul className={styles["genre-select"]}>
			{props.genres.map((genre) => (
				<li className={styles["genre-select__item"]} key={genre}>
					<button
						className={getButtonClasses(genre)}
						onClick={(e) => props.onSelect(genre)}
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
