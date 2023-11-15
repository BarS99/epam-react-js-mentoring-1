import { useLoaderData, useOutletContext } from "@remix-run/react";
import MovieListPage from "../src/pages/MovieListPage/MovieListPage";
import { GetMoviesResponse } from "../src/interfaces/movie.interface";
import MovieListPageDetails from "../src/pages/MovieListPage/components/MovieListPageDetails";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getMovieById } from "../src/repositories/movies";

export const loader = async ({ params }: LoaderFunctionArgs) =>
	getMovieById(params.movieId as string)
		.send()
		.catch(() => null);

const MovieDetailsRoute = () => {
	const movies = useOutletContext<GetMoviesResponse>();
	const movieDetails = useLoaderData<typeof loader>();

	return (
		<MovieListPage loaderMovies={movies}>
			<MovieListPageDetails movieDetails={movieDetails} />
		</MovieListPage>
	);
};

export default MovieDetailsRoute;
