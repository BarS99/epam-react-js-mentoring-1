import { Pagination } from "./pagination.interface";

export interface Movie {
	budget?: number;
	genres: string[];
	id: number;
	overview: string;
	poster_path: string;
	release_date?: string;
	revenue?: number;
	runtime: number;
	tagline?: string;
	title: string;
	vote_average?: number;
	vote_count?: number;
}

export interface MovieFormData {
	genres: string[];
	overview: string;
	poster_path: string;
	release_date?: string;
	runtime: string;
	title: string;
	vote_average?: string;
}

export interface MovieDetailsData {
	budget?: number;
	genres: string[];
	id: number;
	overview: string;
	poster_path: string;
	release_date?: string;
	revenue?: number;
	runtime: number;
	tagline?: string;
	title: string;
	vote_average?: number;
	vote_count?: number;
}

export interface GetMoviesResponse extends Pagination {
	data: Movie[];
}

export interface PostMoviePayload extends Omit<Movie, "id"> {}

export enum MoviesQueryParams {
	SORT = "sortBy",
	SEARCH_QUERY = "search",
	SEARCH_BY = "searchBy",
	FILTER = "filter",
}
