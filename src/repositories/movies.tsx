import { QueryParams } from "../interfaces/fetch.interface";
import { Movie, MovieDetailsData } from "../interfaces/movie.interface";
import { Pagination } from "../interfaces/pagination.interface";
import { buildEndpoint, getFetch } from "../utilities/fetch";

interface GetMoviesResponse extends Pagination {
	data: Movie[];
}

export enum MoviesQueryParams {
	SORT = "sortBy",
	SEARCH_QUERY = "search",
	SEARCH_BY = "searchBy",
	FILTER = "filter",
}

export const getMovies = (queryParams: QueryParams) =>
	getFetch<GetMoviesResponse>(buildEndpoint("movies"), { queryParams });

export const getMovieById = (id: string | number, customSignal?: AbortSignal) =>
	getFetch<MovieDetailsData>(buildEndpoint(`movies/${id}`), { customSignal });

export const getGenres = (): string[] => {
	return ["Drama", "Romance", "Adventure", "Action", "Fantasy"];
};

export const getSortOptions = (): Array<{
	id: string;
	value: string;
}> => {
	return [
		{
			id: "title",
			value: "Title",
		},
		{
			id: "release_date",
			value: "Release Date",
		},
	];
};
