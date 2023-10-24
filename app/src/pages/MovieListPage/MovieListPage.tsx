import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import styles from "./MovieListPage.module.css";
import SortControl from "../../components/SortControl";
import GenreSelect from "../../components/GenreSelect";
import MovieTile from "../../components/MovieTile";
import {
	deleteMovie,
	getGenres,
	getMovies,
	getSortOptions,
} from "../../repositories/movies";
import {
	GetMoviesResponse,
	Movie,
	MoviesQueryParams,
} from "../../interfaces/movie.interface";
import {
	ScrollRestoration,
	useLocation,
	useNavigate,
	useSearchParams,
} from "@remix-run/react";
import { QueryParams } from "../../interfaces/fetch.interface";
import Logo from "../../components/Logo";

interface Props {
	children: React.ReactNode;
	loaderMovies: GetMoviesResponse;
	searchQuery?: string;
}

const MovieListPage = ({ children, loaderMovies, searchQuery }: Props) => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const genres = useRef(getGenres());
	const sortOptions = useRef(getSortOptions());
	const [movies, setMovies] = useState<Movie[]>(loaderMovies.data);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(
		searchParams.get(MoviesQueryParams.FILTER) ?? null
	);
	const [sort, setSort] = useState(
		searchParams.get(MoviesQueryParams.SORT) ?? sortOptions.current[0].id
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
	const [moviesBeingDeleted, setMoviesBeingDeleted] = useState<number[]>([]);

	const handleMovieDelete = async (id: number) => {
		setMoviesBeingDeleted((movies) => [...movies, id]);

		const request = deleteMovie(id);

		try {
			await request.send();
		} finally {
			setMoviesBeingDeleted((movies) =>
				movies.filter((movieId) => movieId !== id)
			);
			fetchAndSetMovies(getQueryParams());
		}
	};

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
							genres={genres.current}
							onSelect={(genre) =>
								setSelectedGenre((currentGenre) =>
									currentGenre === genre ? null : genre
								)
							}
							selectedGenre={selectedGenre}
						/>
						<SortControl
							options={sortOptions.current}
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
								url={`/${item.id}${search}`}
								onEdit={() =>
									navigate(`/edit/${item.id}${search}`)
								}
								onDelete={() =>
									!moviesBeingDeleted.includes(item.id) &&
									handleMovieDelete(item.id)
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
			{children}
			<MainSection />
			<FooterSection />
		</div>
	);
};

export default MovieListPage;
