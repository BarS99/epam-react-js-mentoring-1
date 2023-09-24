import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props {
	children: ReactNode;
	type: "button" | "submit" | "reset";
	color?: "primary" | "secondary";
	onClick?: () => {};
}

const Button = ({
	children,
	type = "button",
	color = "primary",
	onClick,
}: Props) => {
	return (
		<button
			type={type}
			className={[styles["button"], styles[`button--${color}`]].join(" ")}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
