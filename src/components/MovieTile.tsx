import { Movie } from "../interfaces/movie.interface";
import styles from "./MovieTile.module.scss";

interface Props {
	data: Movie;
	onClick: () => void;
}

export const MovieTile = ({ data, onClick }: Props) => {
	return (
		<article className={styles["movie-tile"]} data-cy="movie-tile">
			<img
				className={styles["movie-tile__image"]}
				src={data.poster_path}
				alt={data.title}
				data-testid="image"
			/>
			<div className={styles["movie-tile__content"]}>
				<div className={styles["movie-tile__header"]}>
					<h3
						className={styles["movie-tile__name"]}
						data-testid="name"
					>
						{data.title}
					</h3>
					<p
						className={styles["movie-tile__year"]}
						data-testid="year"
					>
						{data.release_date}
					</p>
				</div>
				<p
					className={styles["movie-tile__genres"]}
					data-testid="genres"
				>
					{data.genres.join(", ")}
				</p>
			</div>
			<button
				className={styles["movie-tile__link"]}
				type="button"
				onClick={onClick}
				data-testid="link"
			>
				{data.title}
			</button>
		</article>
	);
};

export default MovieTile;
