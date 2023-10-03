import { MovieDetailsData } from "../interfaces/movie.interface";
import styles from "./MovieDetails.module.scss";

interface Props {
	data: MovieDetailsData;
	orientation?: "row" | "column";
}

export const MovieDetails = ({ data, orientation = "row" }: Props) => {
	return (
		<article
			className={[
				styles["movie-details"],
				styles[`movie-details--${orientation}`],
			].join(" ")}
			data-testid="item"
			data-cy="movie-details"
		>
			<img
				className={styles["movie-details__image"]}
				src={data.poster_path}
				alt={data.title}
				data-testid="image"
			/>
			<div className={styles["movie-details__content"]}>
				<div className={styles["movie-details__top"]}>
					<div className={styles["movie-details__header"]}>
						<h1
							className={styles["movie-details__name"]}
							data-testid="name"
						>
							{data.title}
						</h1>
						{data.vote_average && (
							<p
								className={styles["movie-details__rating"]}
								data-testid="rating"
							>
								{data.vote_average}
							</p>
						)}
					</div>
					<p
						className={styles["movie-details__genres"]}
						data-testid="genres"
					>
						{data.genres.join(", ")}
					</p>
				</div>
				<div className={styles["movie-details__info"]}>
					{data.release_date && (
						<p
							className={styles["movie-details__info-item"]}
							data-testid="release_date"
						>
							{data.release_date}
						</p>
					)}
					<p
						className={styles["movie-details__info-item"]}
						data-testid="duration"
					>
						{data.runtime} min
					</p>
				</div>
				<div
					className={styles["movie-details__description"]}
					data-testid="description"
				>
					{data.overview}
				</div>
			</div>
		</article>
	);
};

export default MovieDetails;
