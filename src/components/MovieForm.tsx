import { useState } from "react";
import Button from "./Button";
import styles from "./MovieForm.module.scss";
import { Field, Form, Formik } from "formik";
import { MovieFormData } from "../interfaces/movie.interface";
import * as Yup from "yup";

Yup.setLocale({
	mixed: {
		required: "This field is required!",
	},
	number: {
		min: (data) =>
			`This field should contain a value higher than or equal to ${data.min}!`,
		max: (data) =>
			`This field should contain a value lower than or equal to ${data.max}!`,
	},
});

interface Props {
	data?: MovieFormData;
	onSubmit: (data: MovieFormData) => void;
	genres: string[];
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required(),
	release_date: Yup.string().required(),
	poster_path: Yup.string().required(),
	vote_average: Yup.number()
		.typeError("This field should contain a number from 0 to 100!")
		.min(0)
		.max(100),
	genres: Yup.array().min(1, "Select at least one genre to proceed!"),
	runtime: Yup.number().typeError("This field should contain a number!"),
	overview: Yup.string().required(),
});

export const MovieForm = ({ data, onSubmit, genres }: Props) => {
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleGenreSelect = (genres: string[], genre: string): string[] =>
		genres.includes(genre)
			? genres.filter((item) => item !== genre)
			: [...genres, genre];

	return (
		<Formik
			onSubmit={onSubmit}
			onReset={() => {
				setDropdownActive(false);
			}}
			enableReinitialize={true}
			initialValues={{
				title: data?.title ?? "",
				release_date: data?.release_date ?? "",
				overview: data?.overview ?? "",
				vote_average: data?.vote_average ?? "",
				runtime: data?.runtime ?? "",
				genres: [...(data?.genres ?? [])],
				poster_path: data?.poster_path ?? "",
			}}
			validationSchema={validationSchema}
		>
			{({ values, errors, touched, setFieldValue }) => (
				<Form
					className={styles["movie-form"]}
					data-cy="movie-form"
					data-testid="form"
				>
					<div className={styles["movie-form__content"]}>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="title">Title*</label>
								<Field
									className={styles["movie-form__input"]}
									type="text"
									name="title"
									id="title"
									data-testid="title"
									aria-errormessage="title-error"
								/>
								{touched.title && errors.title && (
									<p
										id="title-error"
										className={styles["movie-form__error"]}
									>
										{errors.title}
									</p>
								)}
							</div>
						</div>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="release_date">
									Release Date*
								</label>
								<Field
									className={styles["movie-form__input"]}
									type="date"
									name="release_date"
									id="release_date"
									data-testid="release_date"
									aria-errormessage="release_date-error"
								/>
								{touched.release_date &&
									errors.release_date && (
										<p
											id="release_date-error"
											className={
												styles["movie-form__error"]
											}
										>
											{errors.release_date}
										</p>
									)}
							</div>
						</div>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="poster_path">Poster URL*</label>
								<Field
									className={styles["movie-form__input"]}
									type="text"
									name="poster_path"
									id="poster_path"
									data-testid="poster_path"
								/>
								{touched.poster_path && errors.poster_path && (
									<p
										id="poster_path-error"
										className={styles["movie-form__error"]}
									>
										{errors.poster_path}
									</p>
								)}
							</div>
						</div>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="vote_average">Rating</label>
								<Field
									className={styles["movie-form__input"]}
									type="text"
									name="vote_average"
									id="vote_average"
									data-testid="vote_average"
								/>
								{touched.vote_average &&
									errors.vote_average && (
										<p
											id="vote_average-error"
											className={
												styles["movie-form__error"]
											}
										>
											{errors.vote_average}
										</p>
									)}
							</div>
						</div>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="genre">Genre*</label>
								<div
									className={[
										styles["movie-form__select"],
										dropdownActive &&
											styles[
												"movie-form__select--active"
											],
									].join(" ")}
								>
									<Field
										className={styles["movie-form__input"]}
										type="text"
										name="genre"
										id="genre"
										data-testid="genre"
										placeholder="Select Genres"
										value={values.genres.join(", ")}
										readOnly={true}
										onClick={() =>
											setDropdownActive(
												(active) => !active
											)
										}
									/>
									{touched.genres && errors.genres && (
										<p
											id="genre-error"
											className={
												styles["movie-form__error"]
											}
										>
											{errors.genres}
										</p>
									)}
									{dropdownActive && (
										<div
											className={
												styles[
													"movie-form__select-dropdown"
												]
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
														name="genres"
														id={genre}
														value={genre}
														checked={values.genres.includes(
															genre
														)}
														onChange={() =>
															setFieldValue(
																"genres",
																handleGenreSelect(
																	values.genres,
																	genre
																)
															)
														}
														data-testid="genres"
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
								<Field
									className={styles["movie-form__input"]}
									type="text"
									name="runtime"
									id="runtime"
									data-testid="runtime"
								/>
								{touched.runtime && errors.runtime && (
									<p
										id="runtime-error"
										className={styles["movie-form__error"]}
									>
										{errors.runtime}
									</p>
								)}
							</div>
						</div>
						<div className={styles["movie-form__cell"]}>
							<div className={styles["movie-form__item"]}>
								<label htmlFor="overview">Overview*</label>
								<Field
									component="textarea"
									className={[
										styles["movie-form__input"],
										styles["movie-form__textarea"],
									].join(" ")}
									name="overview"
									id="overview"
									data-testid="overview"
								/>
								{touched.overview && errors.overview && (
									<p
										id="overview-error"
										className={styles["movie-form__error"]}
									>
										{errors.overview}
									</p>
								)}
							</div>
						</div>
					</div>
					<div
						className={styles["movie-form__footer"]}
						data-testid="footer"
					>
						<Button type="reset" color="secondary">
							Reset
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
