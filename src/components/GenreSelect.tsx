import { Component } from "react";
import styles from "./GenreSelect.module.scss";

interface GenreSelectProps {
	genres: string[];
	selectedGenre: string | null;
	onSelect: (genre: string) => void;
}

export default class GenreSelect extends Component<GenreSelectProps> {
	getButtonClasses(genre: string): string {
		const classes = [styles["genre-select__button"]];

		if (genre === this.props.selectedGenre) {
			classes.push(styles["genre-select__button--selected"]);
		}

		return classes.join(" ");
	}

	render() {
		return (
			<ul className={styles["genre-select"]}>
				{this.props.genres.map((genre) => (
					<li className={styles["genre-select__item"]} key={genre}>
						<button
							className={this.getButtonClasses(genre)}
							onClick={(e) => this.props.onSelect(genre)}
							type="button"
							title={`Select ${genre} genre`}
						>
							{genre}
						</button>
					</li>
				))}
			</ul>
		);
	}
}
