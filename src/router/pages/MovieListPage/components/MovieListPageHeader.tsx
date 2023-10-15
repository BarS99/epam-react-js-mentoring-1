import { ReactNode } from "react";
import styles from "./MovieListPageHeader.module.scss";
import Logo from "../../../../components/Logo";

const MovieListPageHeader = ({ children }: { children?: ReactNode }) => (
	<header
		className={styles["movie-list-page-header"]}
		data-cy="movie-list-page-header"
	>
		<Logo />
		{children}
	</header>
);

export default MovieListPageHeader;
