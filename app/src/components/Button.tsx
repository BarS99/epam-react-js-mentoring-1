import { ReactNode } from "react";
import styles from "./Button.module.css";
import React from "react";

interface Props {
	elementType?: string;
	children: ReactNode;
	type?: "button" | "submit" | "reset";
	color?: "primary" | "secondary" | "tertiary";
	onClick?: () => void;
}

const Button = ({
	elementType,
	children,
	type = "button",
	color = "primary",
	onClick,
}: Props) => {
	return React.createElement(
		elementType ? elementType : "button",
		{
			type,
			className: [styles["button"], styles[`button--${color}`]].join(" "),
			onClick: onClick,
		},
		children
	);
};

export default Button;
