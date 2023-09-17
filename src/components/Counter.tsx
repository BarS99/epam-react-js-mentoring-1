import { Component } from "react";
import styles from "./Counter.module.scss";

interface CounterStateProps {
	initialValue: number;
}

interface CounterState {
	value: number;
}

export default class Counter extends Component<
	CounterStateProps,
	CounterState
> {
	state: CounterState = {
		value: this.props.initialValue,
	};

	decrementValue = (): void => {
		this.changeValue(-1);
	};

	incrementValue = (): void => {
		this.changeValue(1);
	};

	changeValue = (diff: number): void => {
		this.setState((state) => ({
			value: state.value + diff,
		}));
	};

	render() {
		return (
			<div className={styles.counter}>
				<button
					type="button"
					key="counter-decrement"
					className={styles.counter__button}
					onClick={this.decrementValue}
				>
					Decrement
				</button>
				<input
					key="counter-value"
					className={styles.counter__value}
					value={this.state.value}
					readOnly={true}
					title="Counter value"
					onChange={(e) => e.preventDefault()}
				/>
				<button
					type="button"
					key="counter-increment"
					className={styles.counter__button}
					onClick={this.incrementValue}
				>
					Increment
				</button>
			</div>
		);
	}
}
