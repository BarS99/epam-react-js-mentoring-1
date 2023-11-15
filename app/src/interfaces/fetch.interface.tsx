export const HOST = "http://localhost:4000";

export interface QueryParams {
	[param: string]: string;
}

export interface FetchOptions {
	body?: any;
	contentType?: string;
	customSignal?: AbortSignal;
	queryParams?: QueryParams;
}

export interface FetchResponse<T> {
	send: () => Promise<T>;
	getController: () => AbortController | null;
}
