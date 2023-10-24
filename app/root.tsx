import { Links, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
//@ts-ignore
import globalStyles from "./src/index.css";
import App from "./src/App";
import { getMovies } from "./src/repositories/movies";
import { Movie } from "./src/interfaces/movie.interface";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
	{ rel: "stylesheet", href: cssBundleHref as string },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const queryParams = Object.fromEntries(new URL(request.url).searchParams);

	return getMovies(queryParams)
		.send()
		.catch(() => ({ data: [] as Movie[], limit: 0, offset: 0, total: 0 }));
};

export default function Root() {
	const movies = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="theme-color" content="#000000" />
				<meta name="description" content="My beautiful React app" />
				<link rel="apple-touch-icon" href="/logo192.png" />
				<link rel="manifest" href="/manifest.json" />
				<Links />
				<Scripts />
				<title>My React App</title>
			</head>
			<body>
				<div id="root">
					<App>
						<Outlet context={movies} />
					</App>
				</div>
				<div id="root-dialog"></div>
			</body>
		</html>
	);
}
