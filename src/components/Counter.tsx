import React, { Component } from "react";
import styles from "./Counter.module.scss";

interface CounterState {
	value: number;
}

export default class Counter extends Component<{}, CounterState> {
	state: CounterState = {
		value: 0,
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
		return React.createElement(
			"div",
			{
				className: styles.counter,
			},
			[
				React.createElement(
					"button",
					{
						key: "counter-decrement",
						className: styles.counter__button,
						onClick: this.decrementValue,
					},
					"Decrement"
				),
				React.createElement(
					"p",
					{ key: "counter-value", className: styles.counter__value },
					this.state.value
				),
				React.createElement(
					"button",
					{
						key: "counter-increment",
						className: styles.counter__button,
						onClick: this.incrementValue,
					},
					"Increment"
				),
			]
		);
	}
}
