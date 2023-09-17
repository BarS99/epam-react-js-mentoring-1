import styles from "./MovieDetails.module.scss";

interface Props {
	data: {
		image: {
			url: string;
			altText: string;
		};
		name: string;
		year: number;
		rating: number;
		duration: string;
		genres: string[];
		description: string;
	};
	orientation: "row" | "column";
}

export const MovieDetails = ({ data, orientation }: Props) => {
	return (
		<article
			className={[
				styles["movie-details"],
				styles[`movie-details--${orientation}`],
			].join(" ")}
			data-testid="item"
		>
			<img
				className={styles["movie-details__image"]}
				src={data.image.url}
				alt={data.image.altText}
				data-testid="image"
			/>
			<div className={styles["movie-details__content"]}>
				<div className={styles["movie-details__top"]}>
					<div className={styles["movie-details__header"]}>
						<h1
							className={styles["movie-details__name"]}
							data-testid="name"
						>
							{data.name}
						</h1>
						<p
							className={styles["movie-details__rating"]}
							data-testid="rating"
						>
							{data.rating}
						</p>
					</div>
					<p
						className={styles["movie-details__genres"]}
						data-testid="genres"
					>
						{data.genres.join(", ")}
					</p>
				</div>
				<div className={styles["movie-details__info"]}>
					<p
						className={styles["movie-details__info-item"]}
						data-testid="year"
					>
						{data.year}
					</p>
					<p
						className={styles["movie-details__info-item"]}
						data-testid="duration"
					>
						{data.duration}
					</p>
				</div>
				<div
					className={styles["movie-details__description"]}
					data-testid="description"
				>
					{data.description}
				</div>
			</div>
		</article>
	);
};

export default MovieDetails;
