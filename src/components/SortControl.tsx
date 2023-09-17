import styles from "./SortControl.module.scss";

interface Props {
	options: string[];
	selection: string;
	onChange: (value: string) => void;
}

const SortControl = ({ options, selection, onChange }: Props) => {
	const selectId = new Date().getTime().toString();
	const optionList = options.map((value) => (
		<option
			className={styles["sort-control__option"]}
			key={value}
			data-testid="option"
		>
			{value}
		</option>
	));

	return (
		<div className={styles["sort-control"]}>
			<label
				className={styles["sort-control__label"]}
				htmlFor={selectId}
				data-testid="label"
			>
				Sort By
			</label>
			<div className={styles["sort-control__select-wrapper"]}>
				<select
					className={styles["sort-control__select"]}
					id={selectId}
					name={selectId}
					onChange={(e) => onChange(e.target.value)}
					value={selection}
					data-testid="select"
				>
					{optionList}
				</select>
			</div>
		</div>
	);
};

export default SortControl;
