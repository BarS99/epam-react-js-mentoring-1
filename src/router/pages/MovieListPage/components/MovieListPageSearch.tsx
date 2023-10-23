import styles from "./MovieListPageSearch.module.scss";
import Button from "../../../../components/Button";
import Container from "../../../../components/Container";
import SearchForm from "../../../../components/SearchForm";
import { useMovieListPage } from "../MovieListPage";
import MovieListPageHeader from "./MovieListPageHeader";
import { Outlet, useNavigate } from "react-router-dom";

const MovieListPageSearch = () => {
	const navigate = useNavigate();
	const { searchQuery, setSearchQuery } = useMovieListPage();

	return (
		<section
			className={styles["movie-list-page-search"]}
			data-cy="movie-list-page-search"
		>
			<Container>
				<MovieListPageHeader>
					<Button
						color="tertiary"
						onClick={() => {
							navigate("new");
						}}
					>
						+ ADD MOVIE
					</Button>
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
			<Outlet />
		</section>
	);
};

export default MovieListPageSearch;
