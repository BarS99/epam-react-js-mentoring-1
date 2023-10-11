import styles from "./MovieListPageSearch.module.scss";
import Button from "../../../../components/Button";
import Container from "../../../../components/Container";
import SearchForm from "../../../../components/SearchForm";
import { useMovieListPage } from "../MovieListPage";
import MovieListPageHeader from "./MovieListPageHeader";

const MovieListPageSearch = () => {
	const { searchQuery, setSearchQuery } = useMovieListPage();

	return (
		<section
			className={styles["movie-list-page-search"]}
			data-cy="movie-list-page-search"
		>
			<Container>
				<MovieListPageHeader>
					<Button color="tertiary">+ ADD MOVIE</Button>
				</MovieListPageHeader>
				<div className={styles["movie-list-page-search__content"]}>
					<h1 className={styles["movie-list-page-search__title"]}>
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
};

export default MovieListPageSearch;
