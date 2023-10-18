export const HOST = "http://localhost:4000";

export interface QueryParams {
	[param: string]: string;
}

export interface FetchOptions {
	queryParams?: QueryParams;
	customSignal?: AbortSignal;
}

export interface FetchResponse<T> {
	send: () => Promise<T>;
	getController: () => AbortController | null;
}
