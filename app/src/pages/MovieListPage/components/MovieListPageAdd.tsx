import styles from "./MovieListPageAdd.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import success from "../../../assets/images/success.png";
import { MovieDetailsData } from "../../../interfaces/movie.interface";
import {
	editMovie,
	getGenres,
	getMovieById,
	postMovie,
} from "../../../repositories/movies";
import { FetchResponse } from "../../../interfaces/fetch.interface";
import Dialog from "../../../components/Dialog";
import { MovieForm } from "../../../components/MovieForm";

interface Props {
	movieId?: string;
}

const MovieListPageAdd = ({ movieId }: Props) => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [movieData, setMovieData] = useState<MovieDetailsData | null>(null);
	const [isMovieDataLoading, setIsMovieDataLoading] = useState(true);
	const [serverErrors, setServerErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState("");
	const genres = useMemo(getGenres, []);
	const postMovieRef = useRef<FetchResponse<null> | null>(null);
	const errorClearTimeout = useRef<any>(null);
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);

		let movieDataAbortController: AbortController | null = null;
		const fetchAndSetMovieData = async (movieId: string) => {
			try {
				const request = getMovieById(movieId);
				movieDataAbortController = request.getController();
				const response = await request.send();

				setMovieData(response);
			} catch {
				setMovieData(null);
			} finally {
				setIsMovieDataLoading(false);
			}
		};

		if (movieId) {
			fetchAndSetMovieData(movieId);
		} else {
			setIsMovieDataLoading(false);
		}

		return () => {
			movieDataAbortController?.abort();
			postMovieRef.current?.getController()?.abort();

			if (errorClearTimeout.current) {
				clearTimeout(errorClearTimeout.current);
			}
		};
	}, [movieId]);

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
		<>
			{isBrowser && (
				<div>
					<Dialog
						closeCallback={() => {
							navigate(`..${search}`);
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
												styles[
													"movie-list-page-add__error"
												]
											}
										>
											{message}!
										</p>
									))}
								{!isMovieDataLoading && (
									<MovieForm
										data={
											movieData
												? {
														genres: movieData.genres,
														overview:
															movieData.overview,
														poster_path:
															movieData.poster_path,
														release_date:
															movieData.release_date,
														runtime:
															movieData.runtime
																? String(
																		movieData.runtime
																  )
																: "",
														title: movieData.title,
														vote_average:
															movieData.vote_average
																? String(
																		movieData.vote_average
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
											postMovieRef.current = movieId
												? editMovie({
														id: Number(movieId),
														genres,
														overview,
														poster_path,
														release_date,
														runtime:
															Number(runtime),
														title,
														vote_average:
															Number(
																vote_average
															),
												  })
												: postMovie({
														genres,
														overview,
														poster_path,
														release_date,
														runtime:
															Number(runtime),
														title,
														vote_average:
															Number(
																vote_average
															),
												  });

											try {
												await postMovieRef.current?.send();

												setSuccessMessage(
													movieId
														? "The movie has been edited in database successfully!"
														: "The movie has been added to database successfully!"
												);
											} catch (err: any) {
												setServerErrors(
													err?.body?.messages
												);
												errorClearTimeout.current =
													setTimeout(() => {
														setServerErrors([]);
													}, 3000);
											}
										}}
										genres={genres}
									/>
								)}
							</>
						)}
					</Dialog>
				</div>
			)}
		</>
	);
};

export default MovieListPageAdd;
