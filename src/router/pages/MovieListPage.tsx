import { ReactNode, useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import styles from "./MovieListPage.module.scss";
import SearchForm from "../../components/SearchForm";
import SortControl from "../../components/SortControl";
import GenreSelect from "../../components/GenreSelect";
import MovieTile from "../../components/MovieTile";
import MovieDetails from "../../components/MovieDetails";
import SearchIcon from "../../assets/icons/SearchIcon";
import {
	getGenres,
	getMovieById,
	getMovies,
	getSortOptions,
} from "../../repositories/movies";
import { Movie, MovieDetailsData } from "../../interfaces/movie.interface";

const MovieListPage = () => {
	const genres = useMemo(getGenres, []);
	const sortOptions = useMemo(getSortOptions, []);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
	const [selectedMovieDetails, setSelectedMovieDetails] =
		useState<MovieDetailsData | null>(null);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const [sort, setSort] = useState(sortOptions[0].id);

	useEffect(() => {
		let setMoviesController: AbortController | null = null;
		const fetchAndSetMovies = async () => {
			try {
				const queryParams = Object.entries({
					sortOrder: sort,
					search: searchQuery,
					searchBy: "title",
					filter: selectedGenre ? [selectedGenre] : null,
				})
					.filter((param) => param[1])
					.reduce(
						(acc, param) => ({ ...acc, [param[0]]: param[1] }),
						{}
					);
				const request = getMovies(queryParams);
				setMoviesController = request.getController();
				const response = await request.send();

				setMovies(response.data);
			} catch {
				setMovies([]);
			}
		};

		fetchAndSetMovies();

		return () => {
			setMoviesController?.abort();
		};
	}, [searchQuery, selectedGenre, sort]);

	useEffect(() => {
		let getMovieByIdController: AbortController | null = null;
		const fetchAndLoadMovie = async (id: number) => {
			try {
				const request = getMovieById(id);
				getMovieByIdController = request.getController();
				const response = await request.send();

				console.log(JSON.stringify(response));

				setSelectedMovieDetails(response);
			} catch {
				setSelectedMovieId(null);
			} finally {
				document.body.scrollTo(0, 0);
			}
		};

		if (selectedMovieId !== null) {
			fetchAndLoadMovie(selectedMovieId);
		} else {
			setSelectedMovieDetails(null);
		}

		return () => {
			getMovieByIdController?.abort();
		};
	}, [selectedMovieId]);

	const Logo = () => (
		<p className={styles["movie-list-page__logo"]}>
			<strong>netflix</strong>roulette
		</p>
	);

	const HeaderSection = ({ children }: { children?: ReactNode }) => (
		<header className={styles["movie-list-page__header"]}>
			<Logo />
			{children}
		</header>
	);

	const TopSearch = () => (
		<section
			className={styles["movie-list-page__search"]}
			data-cy="movie-list-page__search"
		>
			<Container>
				<HeaderSection>
					<Button color="tertiary">+ ADD MOVIE</Button>
				</HeaderSection>
				<div className={styles["movie-list-page__search-content"]}>
					<h1 className={styles["movie-list-page__title"]}>
						Find Your Movie
					</h1>
					<SearchForm
						initSearchQuery={searchQuery}
						onSearch={(value) => setSearchQuery(value)}
					/>
				</div>
			</Container>
		</section>
	);

	const TopMovieDetails = ({ details }: { details: MovieDetailsData }) => (
		<section className={styles["movie-list-page__details"]}>
			<Container>
				<HeaderSection>
					<button
						className={styles["movie-list-page__search-button"]}
						onClick={() => setSelectedMovieId(null)}
						data-cy="movie-list-page__search-button"
					>
						<SearchIcon />
					</button>
				</HeaderSection>
				<MovieDetails data={details} />
			</Container>
		</section>
	);

	const MainSection = () => (
		<main className={styles["movie-list-page__main"]}>
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
								onClick={() => setSelectedMovieId(item.id)}
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
			{selectedMovieDetails ? (
				<TopMovieDetails details={selectedMovieDetails} />
			) : (
				<TopSearch />
			)}
			<MainSection />
			<FooterSection />
		</div>
	);
};

export default MovieListPage;
