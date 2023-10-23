import styles from "./MovieListPageAdd.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../../../../components/Dialog";
import { MovieForm } from "../../../../components/MovieForm";
import {
	editMovie,
	getGenres,
	postMovie,
} from "../../../../repositories/movies";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FetchResponse } from "../../../../interfaces/fetch.interface";
import { MovieDetailsData } from "../../../../interfaces/movie.interface";
import success from "../../../../assets/images/success.png";

const MovieListPageAdd = () => {
	const navigate = useNavigate();
	const params = useParams();
	const loaderData = useLoaderData() as MovieDetailsData;
	const [serverErrors, setServerErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState("");
	const genres = useMemo(getGenres, []);
	const postMovieRef = useRef<FetchResponse<null> | null>(null);
	const errorClearTimeout = useRef<any>(null);

	useEffect(() => {
		return () => {
			postMovieRef.current?.getController()?.abort();

			if (errorClearTimeout.current) {
				clearTimeout(errorClearTimeout.current);
			}
		};
	}, []);

	const SuccessMessage = () => (
		<div
			className={styles["movie-list-page-add__success"]}
			data-cy="movie-list-page-add__success"
		>
			<div className={styles["movie-list-page-add__success-image"]}>
				<img src={success} alt="success" />
			</div>
			<h2 className={styles["movie-list-page-add__success-title"]}>
				Congratulations!
			</h2>
			<p className={styles["movie-list-page-add__success-text"]}>
				{successMessage}
			</p>
		</div>
	);

	return (
		<div>
			<Dialog
				closeCallback={() => {
					navigate("..");
				}}
			>
				{successMessage ? (
					<SuccessMessage />
				) : (
					<>
						{serverErrors &&
							serverErrors.map((message) => (
								<p
									key={message}
									className={
										styles["movie-list-page-add__error"]
									}
								>
									{message}!
								</p>
							))}
						<MovieForm
							data={
								loaderData
									? {
											genres: loaderData.genres,
											overview: loaderData.overview,
											poster_path: loaderData.poster_path,
											release_date:
												loaderData.release_date,
											runtime: loaderData.runtime
												? String(loaderData.runtime)
												: "",
											title: loaderData.title,
											vote_average:
												loaderData.vote_average
													? String(
															loaderData.vote_average
													  )
													: "",
									  }
									: undefined
							}
							onSubmit={async ({
								genres,
								overview,
								poster_path,
								release_date,
								runtime,
								title,
								vote_average,
							}) => {
								postMovieRef.current = params.movieId
									? editMovie({
											id: Number(params.movieId),
											genres,
											overview,
											poster_path,
											release_date,
											runtime: Number(runtime),
											title,
											vote_average: Number(vote_average),
									  })
									: postMovie({
											genres,
											overview,
											poster_path,
											release_date,
											runtime: Number(runtime),
											title,
											vote_average: Number(vote_average),
									  });

								try {
									await postMovieRef.current?.send();

									setSuccessMessage(
										params.movieId
											? "The movie has been edited in database successfully!"
											: "The movie has been added to database successfully!"
									);
								} catch (err: any) {
									setServerErrors(err?.body?.messages);
									errorClearTimeout.current = setTimeout(
										() => {
											setServerErrors([]);
										},
										3000
									);
								}
							}}
							genres={genres}
						/>
					</>
				)}
			</Dialog>
		</div>
	);
};

export default MovieListPageAdd;
