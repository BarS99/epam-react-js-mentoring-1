import { Component } from "react";
import styles from "./SearchForm.module.scss";

interface SearchFormProps {
	initSearchQuery: string;
	onSearch: (value: string) => void;
}

interface SearchFormState {
	value: string;
}

export default class SearchForm extends Component<
	SearchFormProps,
	SearchFormState
> {
	state: SearchFormState = {
		value: this.props.initSearchQuery,
	};

	handleOnChange = (value: string): void => {
		this.setState(() => ({
			value,
		}));
	};

	handleCallback = (e: React.FormEvent): void => {
		e.preventDefault();
		this.props.onSearch(this.state.value);
	};

	render() {
		const placeholder = "What do you want to watch?";

		return (
			<form
				className={styles["search-form"]}
				onSubmit={this.handleCallback}
			>
				<input
					className={styles["search-form__input"]}
					value={this.state.value}
					onChange={(e) => this.handleOnChange(e.target.value)}
					placeholder={placeholder}
				/>
				<button type="submit" className={styles["search-form__button"]}>
					Search
				</button>
			</form>
		);
	}
}
