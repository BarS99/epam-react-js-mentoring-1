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

	form: HTMLFormElement | null = null;

	handleCallback = (e: React.FormEvent): void => {
		e.preventDefault();
		this.props.onSearch(this.state.value);
	};

	handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			this.form?.submit();
		}
	};

	render() {
		return (
			<form
				ref={(form) => (this.form = form)}
				className={styles["search-form"]}
				onSubmit={this.handleCallback}
			>
				<input
					className={styles["search-form__input"]}
					value={this.state.value}
					onChange={(e) =>
						this.setState({
							value: e.target.value,
						})
					}
					onKeyDown={(e) => this.handleKeyDown(e)}
					placeholder="What do you want to watch?"
				/>
				<button type="submit" className={styles["search-form__button"]}>
					Search
				</button>
			</form>
		);
	}
}
