import { MoviesQueryParams } from "../../src/repositories/movies";

describe("MovieListPage", () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: "GET",
				pathname: "movies",
			},
			{
				fixture: "movie/movies.json",
			}
		).as("getMovies");
	});

	describe("page logic based on user's actions", () => {
		beforeEach(() => {
			cy.visit("http://localhost:3000/");
			cy.wait("@getMovies");
		});

		it("movie details logic should work correctly", () => {
			cy.intercept("GET", "movies/*", {
				fixture: "movie/movie.json",
			}).as("getMovieDetails");

			cy.get("[data-cy=movie-list-page-search]").should("exist");
			cy.get("[data-cy=movie-details]").should("not.exist");
			cy.get("[data-cy=movie-tile]").should("have.length", 10);

			cy.get("[data-cy=movie-tile]").first().trigger("click");
			cy.wait("@getMovieDetails");

			cy.get("[data-cy=movie-list-page-search]").should("not.exist");
			cy.get("[data-cy=movie-details]").should("exist");
			cy.get("[data-cy=movie-details] [data-testid=name]").contains(
				"Fifty Shades Freed"
			);

			cy.get(
				"[data-cy=movie-list-page-details] [data-testid=button]"
			).trigger("click");

			cy.get("[data-cy=movie-list-page-search]").should("exist");
			cy.get("[data-cy=movie-details]").should("not.exist");
		});

		it("should search for movies based on provided input", () => {
			cy.intercept(
				{
					method: "GET",
					pathname: "movies",
					query: {
						[MoviesQueryParams.SEARCH_BY]: "title",
						[MoviesQueryParams.SEARCH_QUERY]: "test",
					},
				},
				{
					fixture: "movie/movies.json",
				}
			).as("getMoviesSearch");

			cy.get("[data-cy=search-form]").type("test");
			cy.get("[data-cy=search-form]").submit();

			cy.wait("@getMoviesSearch");

			cy.get("[data-cy=movie-tile] [data-testid=name]").contains(
				"Sleight"
			);
		});

		it("should filter movies by selected genre", () => {
			cy.intercept(
				{
					method: "GET",
					pathname: "movies",
					query: {
						[MoviesQueryParams.FILTER]: "Drama",
					},
				},
				{
					fixture: "movie/movies2.json",
				}
			).as("getMoviesFilter");

			cy.get("[data-cy=genre-select] [data-testid=genre-button]")
				.first()
				.trigger("click");
			cy.wait("@getMoviesFilter");

			cy.get("[data-cy=movie-tile] [data-testid=name]").contains(
				"Sleight"
			);

			cy.get("[data-cy=genre-select] [data-testid=genre-button]")
				.first()
				.trigger("click");
			cy.wait("@getMovies");

			cy.get("[data-cy=movie-tile] [data-testid=name]").contains(
				"Fifty Shades Freed"
			);
		});

		it("should correctly sort the movies", () => {
			cy.intercept(
				{
					method: "GET",
					pathname: "movies",
					query: {
						[MoviesQueryParams.SORT]: "release_date",
					},
				},
				{
					fixture: "movie/movies2.json",
				}
			).as("getMoviesSort");

			cy.get("[data-cy=sort-control] [data-testid=select]").select(
				"release_date"
			);
			cy.wait("@getMoviesSort");

			cy.get("[data-cy=movie-tile] [data-testid=name]").contains(
				"Sleight"
			);
		});
	});

	it("page logic based on provided query params", () => {
		cy.visit(
			`http://localhost:3000/?${MoviesQueryParams.SORT}=release_date&${MoviesQueryParams.SEARCH_QUERY}=test&${MoviesQueryParams.SEARCH_BY}=title&${MoviesQueryParams.FILTER}=Fantasy`
		);
		cy.wait("@getMovies");

		cy.get("[data-cy=sort-control] [data-testid=select]").should(
			"have.value",
			"release_date"
		);
		cy.get("[data-cy=search-form] [data-testid=input]").should(
			"have.value",
			"test"
		);
		cy.get(
			"[data-cy=genre-select] [data-testid=genre-button][aria-pressed=true]"
		).contains("Fantasy");
	});
});
