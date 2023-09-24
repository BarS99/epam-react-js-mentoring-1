import { FormEvent, useState } from "react";
import Button from "./Button";
import styles from "./MovieForm.module.scss";

interface Props {
	data?: {
		date: string;
		overview: string;
		rating: string;
		runtime: string;
		selectedGenres: string[];
		title: string;
		url: string;
	};
	onSubmit: (e: FormEvent) => void;
	genres: string[];
}

export const MovieForm = ({ data, onSubmit, genres }: Props) => {
	const [dropdownActive, setDropdownActive] = useState(false);
	const [date, setDate] = useState(data?.date ?? "");
	const [overview, setOverview] = useState(data?.overview ?? "");
	const [rating, setRating] = useState(data?.rating ?? "");
	const [runtime, setRuntime] = useState(data?.runtime ?? "");
	const [selectedGenres, setSelectedGenres] = useState<string[]>([
		...(data?.selectedGenres ?? []),
	]);
	const [title, setTitle] = useState(data?.title ?? "");
	const [url, setUrl] = useState(data?.url ?? "");

	const handleGenreSelect = (genre: string): void => {
		setSelectedGenres((selectedGenres) =>
			selectedGenres.includes(genre)
				? selectedGenres.filter((item) => item !== genre)
				: [...selectedGenres, genre]
		);
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
		onSubmit(e);
	};

	return (
		<form
			className={styles["movie-form"]}
			onSubmit={handleSubmit}
			data-testid="form"
		>
			<div className={styles["movie-form__content"]}>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="title">Title</label>
						<input
							className={styles["movie-form__input"]}
							type="text"
							name="title"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							data-testid="title"
						/>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="date">Release Date</label>
						<input
							className={styles["movie-form__input"]}
							type="date"
							name="date"
							id="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							data-testid="date"
						/>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="url">Movie URL</label>
						<input
							className={styles["movie-form__input"]}
							type="text"
							name="url"
							id="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							data-testid="url"
						/>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="rating">Rating</label>
						<input
							className={styles["movie-form__input"]}
							type="text"
							name="rating"
							id="rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							data-testid="rating"
						/>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="genre">Genre</label>
						<div
							className={[
								styles["movie-form__select"],
								dropdownActive &&
									styles["movie-form__select--active"],
							].join(" ")}
						>
							<input
								className={styles["movie-form__input"]}
								type="text"
								id="genre"
								readOnly={true}
								placeholder="Select Genres"
								value={selectedGenres.join(", ")}
								onClick={() =>
									setDropdownActive((active) => !active)
								}
								data-testid="genre"
							/>
							{dropdownActive && (
								<div
									className={
										styles["movie-form__select-dropdown"]
									}
								>
									{genres.map((genre) => (
										<div
											key={genre}
											className={
												styles[
													"movie-form__select-value"
												]
											}
										>
											<input
												className={
													styles[
														"movie-form__checkbox"
													]
												}
												type="checkbox"
												name="selectedGenres"
												id={genre}
												value={genre}
												checked={selectedGenres.includes(
													genre
												)}
												onChange={() =>
													handleGenreSelect(genre)
												}
												data-testid="selectedGenres"
											/>
											<label
												className={
													styles[
														"movie-form__checkbox-label"
													]
												}
												htmlFor={genre}
											>
												{genre}
											</label>
											<div
												className={
													styles[
														"movie-form__checkbox-icon"
													]
												}
											></div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="runtime">Runtime</label>
						<input
							className={styles["movie-form__input"]}
							type="text"
							name="runtime"
							id="runtime"
							value={runtime}
							onChange={(e) => setRuntime(e.target.value)}
							data-testid="runtime"
						/>
					</div>
				</div>
				<div className={styles["movie-form__cell"]}>
					<div className={styles["movie-form__item"]}>
						<label htmlFor="overview">Overview</label>
						<textarea
							className={[
								styles["movie-form__input"],
								styles["movie-form__textarea"],
							].join(" ")}
							name="overview"
							id="overview"
							value={overview}
							onChange={(e) => setOverview(e.target.value)}
							data-testid="overview"
						/>
					</div>
				</div>
			</div>
			<div className={styles["movie-form__footer"]}>
				<Button type="reset" color="secondary">
					Reset
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
};
