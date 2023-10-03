import styles from "./App.module.scss";
import MovieListPage from "./router/pages/MovieListPage";

const App = () => {
	return (
		<>
			<div className={styles.app}>
				<MovieListPage />
			</div>
			<div id="root-dialog"></div>
		</>
	);
};

export default App;
