import MovieListPageSearch from "../src/pages/MovieListPage/components/MovieListPageSearch";
import MovieListPageAdd from "../src/pages/MovieListPage/components/MovieListPageAdd";
import MovieListPage from "../src/pages/MovieListPage/MovieListPage";
import { useOutletContext, useSearchParams } from "@remix-run/react";
import {
	GetMoviesResponse,
	MoviesQueryParams,
} from "../src/interfaces/movie.interface";
import { useState } from "react";

const NewRoute = () => {
	const movies = useOutletContext<GetMoviesResponse>();
	const [searchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get(MoviesQueryParams.SEARCH_QUERY) ?? ""
	);

	return (
		<MovieListPage loaderMovies={movies} searchQuery={searchQuery}>
			<MovieListPageSearch
				initSearchQuery={searchQuery}
				setSearchQuery={(query) => setSearchQuery(query)}
			>
				<MovieListPageAdd />
			</MovieListPageSearch>
		</MovieListPage>
	);
};

export default NewRoute;
