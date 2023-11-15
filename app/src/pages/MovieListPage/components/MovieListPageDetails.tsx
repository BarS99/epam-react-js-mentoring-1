import { useLocation } from "react-router-dom";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Container from "../../../components/Container";
import MovieDetails from "../../../components/MovieDetails";
import { MovieDetailsData } from "../../../interfaces/movie.interface";
import styles from "./MovieListPageDetails.module.css";
import MovieListPageHeader from "./MovieListPageHeader";
import { Link } from "@remix-run/react";

interface Props {
	movieDetails: MovieDetailsData | null;
}

const MovieListPageDetails = ({ movieDetails }: Props) => {
	const { search } = useLocation();

	return (
		<section
			className={styles["movie-list-page-details"]}
			data-cy="movie-list-page-details"
		>
			<Container>
				<MovieListPageHeader>
					<Link
						className={
							styles["movie-list-page-details__search-button"]
						}
						to={`..${search}`}
						data-testid="button"
					>
						<SearchIcon />
					</Link>
				</MovieListPageHeader>
				{movieDetails ? (
					<MovieDetails data={movieDetails} />
				) : (
					<h1>Movie not found!</h1>
				)}
			</Container>
		</section>
	);
};

export default MovieListPageDetails;
