import { createBrowserRouter } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import MovieListPageSearch from "./pages/MovieListPage/components/MovieListPageSearch";
import MovieListPageDetails from "./pages/MovieListPage/components/MovieListPageDetails";
import { getMovieById } from "../repositories/movies";
import MovieListPageAdd from "./pages/MovieListPage/components/MovieListPageAdd";

const Root = () => {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		document.body.scrollTo(0, 0);
	}, [pathname]);

	return <Outlet />;
};

export const Router = createBrowserRouter([
	{
		path: "",
		element: <Root />,
		children: [
			{
				path: "",
				element: <MovieListPage />,
				children: [
					{
						path: "",
						element: <MovieListPageSearch />,
						children: [
							{ element: <MovieListPageAdd />, path: "new" },
							{
								element: <MovieListPageAdd />,
								path: "edit/:movieId",
								loader: async ({ params, request }) =>
									getMovieById(
										params.movieId as string,
										request.signal
									).send(),
							},
						],
					},
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
