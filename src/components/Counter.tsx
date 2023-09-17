import { useState } from "react";
import styles from "./Counter.module.scss";

interface Props {
	initialValue: number;
}

const Counter = ({ initialValue }: Props) => {
	const [value, setValue] = useState<number>(initialValue);

	const decrementValue = (): void => {
		setValue((value) => value - 1);
	};

	const incrementValue = (): void => {
		setValue((value) => value + 1);
	};

	return (
		<div className={styles.counter}>
			<button
				type="button"
				key="counter-decrement"
				className={styles.counter__button}
				onClick={decrementValue}
				data-testid="counter-decrement"
			>
				Decrement
			</button>
			<input
				key="counter-value"
				className={styles.counter__value}
				value={value}
				readOnly={true}
				onChange={(e) => e.preventDefault()}
				data-testid="counter-value"
			/>
			<button
				type="button"
				key="counter-increment"
				className={styles.counter__button}
				onClick={incrementValue}
				data-testid="counter-increment"
			>
				Increment
			</button>
		</div>
	);
};

export default Counter;
