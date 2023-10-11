import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "../../../components/Container";
import styles from "./MovieListPage.module.scss";
import SortControl from "../../../components/SortControl";
import GenreSelect from "../../../components/GenreSelect";
import MovieTile from "../../../components/MovieTile";
import {
	MoviesQueryParams,
	getGenres,
	getMovies,
	getSortOptions,
} from "../../../repositories/movies";
import { Movie } from "../../../interfaces/movie.interface";
import {
	Outlet,
	ScrollRestoration,
	useNavigate,
	useOutletContext,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { QueryParams } from "../../../interfaces/fetch.interface";
import Logo from "../../../components/Logo";

type MovieListPageContext = {
	searchQuery: string;
	setSearchQuery: (searchQuery: string) => void;
};

const MovieListPage = () => {
	const navigate = useNavigate();
	const { movieId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const genres = useMemo(getGenres, []);
	const sortOptions = useMemo(getSortOptions, []);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get(MoviesQueryParams.SEARCH_QUERY) ?? ""
	);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(
		searchParams.get(MoviesQueryParams.FILTER) ?? null
	);
	const [sort, setSort] = useState(
		searchParams.get(MoviesQueryParams.SORT) ?? sortOptions[0].id
	);
	const setMoviesController = useRef<AbortController | null>(null);
	const getQueryParams = useCallback(
		(): QueryParams =>
			Object.entries({
				[MoviesQueryParams.SORT]: sort,
				[MoviesQueryParams.SEARCH_QUERY]: searchQuery,
				[MoviesQueryParams.SEARCH_BY]: "title",
				[MoviesQueryParams.FILTER]: selectedGenre ?? null,
			})
				.filter((param) => param[1])
				.reduce((acc, param) => ({ ...acc, [param[0]]: param[1] }), {}),
		[searchQuery, selectedGenre, sort]
	);
	const fetchAndSetMovies = useCallback(async (queryParams: QueryParams) => {
		try {
			const request = getMovies(queryParams);
			setMoviesController.current = request.getController();
			const response = await request.send();

			setMovies(response.data);
		} catch {
			setMovies([]);
		}
	}, []);

	useEffect(() => {
		const queryParams = getQueryParams();

		setSearchParams(new URLSearchParams(Object.entries(queryParams)));
		fetchAndSetMovies(queryParams);

		return () => {
			setMoviesController.current?.abort();
		};
	}, [
		searchQuery,
		selectedGenre,
		sort,
		setSearchParams,
		getQueryParams,
		fetchAndSetMovies,
	]);

	const MainSection = () => (
		<main className={styles["movie-list-page__main"]}>
			<ScrollRestoration />
			<Container>
				<div className={styles["movie-list-page__main-inner"]}>
					<div className={styles["movie-list-page__controls"]}>
						<GenreSelect
							genres={genres}
							onSelect={(genre) =>
								setSelectedGenre((currentGenre) =>
									currentGenre === genre ? null : genre
								)
							}
							selectedGenre={selectedGenre}
						/>
						<SortControl
							options={sortOptions}
							selection={sort}
							onChange={(selection) => setSort(selection)}
						/>
					</div>
					<p className={styles["movie-list-page__count"]}>
						<strong>{movies.length}</strong> movies found
					</p>
					<div className={styles["movie-list-page__list"]}>
						{movies.map((item) => (
							<MovieTile
								key={item.id}
								data={item}
								onClick={() =>
									movieId !== item.id.toString() &&
									navigate(item.id.toString())
								}
							/>
						))}
					</div>
				</div>
			</Container>
		</main>
	);

	const FooterSection = () => (
		<footer className={styles["movie-list-page__footer"]}>
			<Container>
				<Logo />
			</Container>
		</footer>
	);

	return (
		<div className={styles["movie-list-page"]}>
			<Outlet
				context={
					{
						searchQuery,
						setSearchQuery: (searchQuery: string) => {
							setSearchQuery(searchQuery);
						},
					} satisfies MovieListPageContext
				}
			/>
			<MainSection />
			<FooterSection />
		</div>
	);
};

export default MovieListPage;

export const useMovieListPage = () => useOutletContext<MovieListPageContext>();
