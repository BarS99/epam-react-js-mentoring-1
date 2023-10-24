import { QueryParams } from "../interfaces/fetch.interface";
import {
	GetMoviesResponse,
	Movie,
	MovieDetailsData,
	PostMoviePayload,
} from "../interfaces/movie.interface";
import {
	buildEndpoint,
	deleteFetch,
	getFetch,
	postFetch,
	putFetch,
} from "../utilities/fetch";

export const getMovies = (queryParams: QueryParams) =>
	getFetch<GetMoviesResponse>(buildEndpoint("movies"), { queryParams });

export const getMovieById = (id: string | number, customSignal?: AbortSignal) =>
	getFetch<MovieDetailsData>(buildEndpoint(`movies/${id}`), { customSignal });

export const getGenres = (): string[] => {
	return ["Drama", "Romance", "Adventure", "Action", "Fantasy"];
};

export const postMovie = (payload: PostMoviePayload) =>
	postFetch<null>(buildEndpoint("movies"), {
		body: JSON.stringify(payload),
	});

export const editMovie = (payload: Movie) =>
	putFetch<null>(buildEndpoint("movies"), {
		body: JSON.stringify(payload),
	});

export const deleteMovie = (id: string | number) =>
	deleteFetch<null>(buildEndpoint(`movies/${id}`));

export const getSortOptions = (): Array<{
	id: string;
	value: string;
}> => [
	{
		id: "title",
		value: "Title",
	},
	{
		id: "release_date",
		value: "Release Date",
	},
];
