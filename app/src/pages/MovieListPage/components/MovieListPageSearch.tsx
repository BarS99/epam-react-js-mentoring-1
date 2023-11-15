import styles from "./MovieListPageSearch.module.css";
import MovieListPageHeader from "./MovieListPageHeader";
import { Link, useLocation } from "@remix-run/react";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import SearchForm from "../../../components/SearchForm";

interface Props {
	children?: React.ReactNode;
	initSearchQuery: string;
	setSearchQuery: (value: string) => void;
}

const MovieListPageSearch = ({
	children,
	initSearchQuery,
	setSearchQuery,
}: Props) => {
	const { search } = useLocation();

	return (
		<section
			className={styles["movie-list-page-search"]}
			data-cy="movie-list-page-search"
		>
			<Container>
				<MovieListPageHeader>
					<Link to={`/new/${search}`}>
						<Button elementType="span" color="tertiary">
							+ ADD MOVIE
						</Button>
					</Link>
				</MovieListPageHeader>
				<div className={styles["movie-list-page-search__content"]}>
					<h1 className={styles["movie-list-page-search__title"]}>
						Find Your Movie
					</h1>
					<SearchForm
						initSearchQuery={initSearchQuery}
						onSearch={(value) => setSearchQuery(value)}
					/>
				</div>
			</Container>
			{children}
		</section>
	);
};

export default MovieListPageSearch;
