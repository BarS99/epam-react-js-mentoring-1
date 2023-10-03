import {
	FetchOptions,
	FetchResponse,
	HOST,
	QueryParams,
} from "../interfaces/fetch.interface";

const handleFetchDataResponse = <T,>(response: Response): Promise<T> =>
	response.ok
		? response.json()
		: Promise.reject({
				status: response.status,
				statusText: response.statusText,
		  });

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
		signal: controller.signal,
	});

	return handleFetchDataResponse<T>(fetchResponse);
};

export const getFetch = <T,>(url: string, options?: FetchOptions) => {
	const controller = new AbortController();

	return {
		send: () => fetchData<T>(url, "GET", controller, options),
		getController: () => controller,
	} as FetchResponse<T>;
};

export const buildEndpoint = (path: string): string => `${HOST}/${path}`;
