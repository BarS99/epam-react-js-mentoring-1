import { useOutletContext, useSearchParams } from "@remix-run/react";
import MovieListPage from "../src/pages/MovieListPage/MovieListPage";
import {
	GetMoviesResponse,
	MoviesQueryParams,
} from "../src/interfaces/movie.interface";
import MovieListPageSearch from "../src/pages/MovieListPage/components/MovieListPageSearch";
import { useState } from "react";

const IndexRoute = () => {
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
			/>
		</MovieListPage>
	);
};

export default IndexRoute;
