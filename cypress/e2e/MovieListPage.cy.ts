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
			cy.intercept("GET", "movies/337167", {
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

			cy.wait(50);
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

	describe("movie form modal", () => {
		beforeEach(() => {
			cy.visit("http://localhost:3000/");
			cy.wait("@getMovies");
		});

		it("should open add movie form", () => {
			const movieFormSelector = "[data-cy=dialog] [data-cy=movie-form]";
			cy.get(movieFormSelector).should("not.exist");

			cy.get("[data-cy=movie-list-page-header] button").trigger("click");

			cy.get(movieFormSelector).should("exist");
			cy.get(`${movieFormSelector} [data-testid=title]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=release_date]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=poster_path]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=vote_average]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=genre]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=runtime]`).should(
				"have.value",
				""
			);
			cy.get(`${movieFormSelector} [data-testid=overview]`).should(
				"have.value",
				""
			);
		});

		it("should open edit movie form and add movie on submit", () => {
			cy.intercept({
				method: "PUT",
				pathname: "movies",
			}).as("putMovie");

			const movieFormSelector = "[data-cy=dialog] [data-cy=movie-form]";
			cy.get(movieFormSelector).should("not.exist");

			cy.get("[data-cy=movie-tile]")
				.first()
				.find("[data-testid=context-open]")
				.trigger("click");
			cy.get("[data-cy=movie-tile]")
				.first()
				.find("[data-testid=context] [data-testid=edit]")
				.trigger("click");

			cy.intercept("GET", "movies/337167", {
				fixture: "movie/movie.json",
			}).as("getMovieDetails");
			cy.wait("@getMovieDetails");

			cy.get(movieFormSelector).should("exist");

			cy.get(movieFormSelector).should("exist");
			cy.get(`${movieFormSelector} [data-testid=title]`).should(
				"have.value",
				"Fifty Shades Freed"
			);
			cy.get(`${movieFormSelector} [data-testid=release_date]`).should(
				"have.value",
				"2018-02-07"
			);
			cy.get(`${movieFormSelector} [data-testid=poster_path]`).should(
				"have.value",
				"https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg"
			);
			cy.get(`${movieFormSelector} [data-testid=vote_average]`).should(
				"have.value",
				"6.1"
			);
			cy.get(`${movieFormSelector} [data-testid=genre]`).should(
				"have.value",
				"Drama, Romance"
			);
			cy.get(`${movieFormSelector} [data-testid=runtime]`).should(
				"have.value",
				"106"
			);
			cy.get(`${movieFormSelector} [data-testid=overview]`).should(
				"have.value",
				"Believing they have left behind shadowy..."
			);

			cy.get(movieFormSelector).submit();

			cy.wait("@putMovie");

			cy.get(
				"[data-cy=dialog] [data-cy=movie-list-page-add__success]"
			).should("exist");
		});
	});
});
