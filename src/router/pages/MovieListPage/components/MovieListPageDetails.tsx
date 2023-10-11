import styles from "./MovieListPageDetails.module.scss";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import Container from "../../../../components/Container";
import MovieDetails from "../../../../components/MovieDetails";
import MovieListPageHeader from "./MovieListPageHeader";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieDetailsData } from "../../../../interfaces/movie.interface";

const MovieListPageDetails = () => {
	const data = useLoaderData() as MovieDetailsData;
	const navigate = useNavigate();

	return (
		<section className={styles["movie-list-page-details"]} data-cy="movie-list-page-details">
			<Container>
				<MovieListPageHeader>
					<button
						className={
							styles["movie-list-page-details__search-button"]
						}
						onClick={() => navigate("..")}
						data-testid="button"
					>
						<SearchIcon />
					</button>
				</MovieListPageHeader>
				<MovieDetails data={data} />
			</Container>
		</section>
	);
};

export default MovieListPageDetails;
