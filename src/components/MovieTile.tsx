import styles from "./MovieTile.module.scss";

interface Props {
	data: {
		image: {
			url: string;
			altText: string;
		};
		name: string;
		year: number;
		genres: string[];
	};
	onClick: () => void;
}

export const MovieTile = ({ data, onClick }: Props) => {
	return (
		<article className={styles["movie-tile"]}>
			<img
				className={styles["movie-tile__image"]}
				src={data.image.url}
				alt={data.image.altText}
				data-testid="image"
			/>
			<div className={styles["movie-tile__content"]}>
				<div className={styles["movie-tile__header"]}>
					<h3
						className={styles["movie-tile__name"]}
						data-testid="name"
					>
						{data.name}
					</h3>
					<p
						className={styles["movie-tile__year"]}
						data-testid="year"
					>
						{data.year}
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
				{data.name}
			</button>
		</article>
	);
};

export default MovieTile;
