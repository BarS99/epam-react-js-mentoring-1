import { useRef, useState } from "react";
import styles from "./SearchForm.module.scss";

interface Props {
	initSearchQuery: string;
	onSearch: (value: string) => void;
}

const SearchForm = (props: Props) => {
	const [value, setValue] = useState<string>(props.initSearchQuery);
	const formRef = useRef<HTMLFormElement>(null);

	const handleCallback = (e: React.FormEvent): void => {
		e.preventDefault();
		props.onSearch(value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			formRef.current?.submit();
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
