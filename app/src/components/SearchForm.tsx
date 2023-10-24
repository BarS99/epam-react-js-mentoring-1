import { useRef, useState } from "react";
import styles from "./SearchForm.module.css";
import Button from "./Button";

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
			data-cy="search-form"
			data-testid="form"
		>
			<input
				className={styles["search-form__input"]}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				placeholder="Search..."
				data-testid="input"
			/>
			<Button type="submit" data-testid="submit">
				Search
			</Button>
		</form>
	);
};

export default SearchForm;
