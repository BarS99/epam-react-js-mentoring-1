import { useState } from "react";
import styles from "./App.module.scss";
import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	const handleOnSearch = (value: string): void => {
		console.log(`Search query: ${value}`);
	};

	const handleOnSelect = (value: string): void => {
		setSelectedGenre(value);
	};

	const initialSearchQuery = "initial search query";
	const genres = ["action", "drama", "romance", "horror", "thriller"];

	return (
		<div className={styles.app}>
			<Counter initialValue={0} />
			<SearchForm
				initSearchQuery={initialSearchQuery}
				onSearch={handleOnSearch}
			/>
			<GenreSelect
				genres={genres}
				selectedGenre={selectedGenre}
				onSelect={handleOnSelect}
			/>
		</div>
	);
};

export default App;
