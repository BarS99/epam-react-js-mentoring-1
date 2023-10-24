import {
	FetchOptions,
	FetchResponse,
	HOST,
	QueryParams,
} from "../interfaces/fetch.interface";

const handleFetchDataResponse = async <T,>(response: Response): Promise<T> => {
	const body = response.status === 204 ? null : await response.json();

	return response.ok
		? body
		: Promise.reject({
				status: response.status,
				statusText: response.statusText,
				body,
		  });
};

const filterUndefinedAndNullParams = (
	queryParams: QueryParams = {}
): QueryParams => {
	return Object.entries(queryParams)
		.filter((param) => param[1] !== undefined && param[1] !== null)
		.reduce((acc, param) => ({ ...acc, [param[0]]: param[1] }), {});
};

const mergeParams = (
	url: string,
	queryParams: QueryParams = {}
): QueryParams => {
	const urlObj = new URL(url);

	const urlParams = {
		...Object.fromEntries(urlObj.searchParams),
		...queryParams,
	};

	return filterUndefinedAndNullParams(urlParams);
};

const getUrlWithoutParams = (url: string): string => {
	return url.includes("?") ? url.substring(0, url.indexOf("?")) : url;
};

const mergeUrlAndParams = (url: string, params: QueryParams): string => {
	return Object.keys(params).length
		? `${url}?${Object.entries(params)
				.map((item) => `${item[0]}=${item[1]}`)
				.join("&")}`
		: url;
};

const getHttpHeaders = ({
	contentType,
	body,
}: {
	contentType?: string;
	body?: string;
}): HeadersInit | undefined => {
	if (contentType) {
		return {
			"Content-Type": contentType,
		};
	} else if (!contentType && body) {
		return {
			"Content-Type": "application/json",
		};
	} else {
		return undefined;
	}
};

const fetchData = async <T,>(
	url: string,
	method: string,
	controller: AbortController,
	options?: FetchOptions
): Promise<T> => {
	const urlWithoutParams = getUrlWithoutParams(url);
	const urlParams = mergeParams(url, options?.queryParams);
	const fetchUrl = mergeUrlAndParams(urlWithoutParams, urlParams);

	const fetchResponse = await fetch(fetchUrl, {
		method,
		signal: options?.customSignal ?? controller.signal,
		body: options?.body,
		headers: getHttpHeaders({
			body: options?.body,
			contentType: options?.contentType,
		}),
	});

	return handleFetchDataResponse<T>(fetchResponse);
};

export const getRequestControl = <T,>(
	url: string,
	method: string,
	options?: FetchOptions
) => {
	const controller = new AbortController();

	return {
		send: () => fetchData<T>(url, method, controller, options),
		getController: () => (options?.customSignal ? null : controller),
	} as FetchResponse<T>;
};

export const getFetch = <T,>(url: string, options?: FetchOptions) =>
	getRequestControl<T>(url, "GET", options);

export const postFetch = <T,>(url: string, options?: FetchOptions) =>
	getRequestControl<T>(url, "POST", options);

export const putFetch = <T,>(url: string, options?: FetchOptions) =>
	getRequestControl<T>(url, "PUT", options);

export const deleteFetch = <T,>(url: string, options?: FetchOptions) =>
	getRequestControl<T>(url, "DELETE", options);

export const buildEndpoint = (path: string): string => `${HOST}/${path}`;
