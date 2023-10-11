import { createBrowserRouter } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import MovieListPageSearch from "./pages/MovieListPage/components/MovieListPageSearch";
import MovieListPageDetails from "./pages/MovieListPage/components/MovieListPageDetails";
import { getMovieById } from "../repositories/movies";
import Root from "./Root";

export const Router = createBrowserRouter([
	{
		path: "",
		element: <Root />,
		children: [
			{
				path: "",
				element: <MovieListPage />,
				children: [
					{ element: <MovieListPageSearch />, path: "" },
					{
						element: <MovieListPageDetails />,
						path: ":movieId",
						loader: async ({ params, request }) =>
							getMovieById(
								params.movieId as string,
								request.signal
							).send(),
					},
				],
			},
		],
	},
]);
