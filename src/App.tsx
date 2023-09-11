import { Component } from "react";
import styles from "./App.module.scss";
import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";

interface AppState {
	selectedGenre: string | null;
}

class App extends Component<{}, AppState> {
	state: AppState = {
		selectedGenre: null,
	};

	handleOnSearch = (value: string): void => {
		console.log(`Search query: ${value}`);
	};

	handleOnSelect = (value: string): void => {
		this.setState({
			selectedGenre: value,
		});
	};

	render() {
		const initialSearchQuery = "initial search query";
		const genres = ["action", "drama", "romance", "horror", "thriller"];

		return (
			<div className={styles.app}>
				<Counter initialValue={0} />
				<SearchForm
					initSearchQuery={initialSearchQuery}
					onSearch={this.handleOnSearch}
				/>
				<GenreSelect
					genres={genres}
					selectedGenre={this.state.selectedGenre}
					onSelect={this.handleOnSelect}
				/>
			</div>
		);
	}
}

export default App;
