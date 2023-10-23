import { useState } from "react";
import { Movie } from "../interfaces/movie.interface";
import styles from "./MovieTile.module.scss";

interface Props {
	data: Movie;
	onClick: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export const MovieTile = ({ data, onClick, onEdit, onDelete }: Props) => {
	const [showContextMenu, setShowContextMenu] = useState(false);

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
			{!showContextMenu && (
				<button
					className={styles["movie-tile__context-open"]}
					type="button"
					title={`Open tooltip for ${data.title}`}
					onClick={() => setShowContextMenu(true)}
					data-testid="context-open"
				>
					<div className={styles["movie-tile__context-dot"]}></div>
					<div className={styles["movie-tile__context-dot"]}></div>
					<div className={styles["movie-tile__context-dot"]}></div>
				</button>
			)}
			{showContextMenu && (
				<div
					className={styles["movie-tile__context"]}
					role="tooltip"
					onMouseLeave={() => setShowContextMenu(false)}
					data-testid="context"
				>
					<button
						className={styles["movie-tile__context-close"]}
						type="button"
						title={`Close tooltip for ${data.title}`}
						onClick={() => setShowContextMenu(false)}
						data-testid="context-close"
					>
						X
					</button>
					<ul className={styles["movie-tile__context-list"]}>
						<li className={styles["movie-tile__context-item"]}>
							<button
								className={styles["movie-tile__context-link"]}
								onClick={onEdit}
								data-testid="edit"
							>
								Edit
							</button>
						</li>
						<li className={styles["movie-tile__context-item"]}>
							<button
								className={styles["movie-tile__context-link"]}
								onClick={onDelete}
								data-testid="delete"
							>
								Delete
							</button>
						</li>
					</ul>
				</div>
			)}
		</article>
	);
};

export default MovieTile;
