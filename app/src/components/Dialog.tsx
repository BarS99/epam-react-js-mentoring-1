import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import { ReactNode } from "react";
import Container from "./Container";
import FocusTrap from "focus-trap-react";

interface Props {
	title?: JSX.Element | string;
	children: ReactNode;
	closeCallback: () => void;
	targetContainer?: HTMLElement;
}

const Dialog = ({
	title,
	children,
	closeCallback,
	targetContainer = document.getElementById("root-dialog") as HTMLElement,
}: Props) => {
	return createPortal(
		<>
			<div className={styles["dialog__backdrop"]}></div>
			<div className={styles["dialog"]} data-cy="dialog">
				<Container>
					<FocusTrap
						focusTrapOptions={{
							fallbackFocus: document.createElement("div"),
						}}
					>
						<div className={styles["dialog__window"]}>
							<button
								className={styles["dialog__close"]}
								type="button"
								title="Close Modal"
								onClick={closeCallback}
								data-testid="close-button"
							></button>
							{title && (
								<h2
									className={styles["dialog__title"]}
									data-testid="title"
								>
									{title}
								</h2>
							)}
							<div
								className={styles["dialog__body"]}
								data-testid="body"
							>
								{children}
							</div>
						</div>
					</FocusTrap>
				</Container>
			</div>
		</>,
		targetContainer
	);
};

export default Dialog;
