export const HOST = "http://localhost:4000";

export interface QueryParams {
	[param: string]: string | number | boolean;
}

export interface FetchOptions {
	queryParams?: QueryParams;
}

export interface FetchResponse<T> {
	send: () => Promise<T>;
	getController: () => AbortController;
}
