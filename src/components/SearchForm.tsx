import { useRef, useState } from "react";
import styles from "./SearchForm.module.scss";

interface Props {
	initSearchQuery: string;
	onSearch: (value: string) => void;
}

const SearchForm = ({ initSearchQuery, onSearch }: Props) => {
	const [value, setValue] = useState<string>(initSearchQuery);
	const formRef = useRef<HTMLFormElement>(null);

	const handleCallback = (e: React.FormEvent): void => {
		e.preventDefault();
		onSearch(value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			formRef.current?.dispatchEvent(
				new Event("submit", { bubbles: true })
			);
		}
	};

	return (
		<form
			ref={formRef}
			className={styles["search-form"]}
			onSubmit={handleCallback}
		>
			<input
				className={styles["search-form__input"]}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				placeholder="Search..."
				data-testid="input"
			/>
			<button
				type="submit"
				className={styles["search-form__button"]}
				data-testid="submit"
			>
				Search
			</button>
		</form>
	);
};

export default SearchForm;
