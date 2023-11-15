import { fireEvent, render, screen } from "@testing-library/react";
import Dialog from "./Dialog";

let targetContainer: HTMLDivElement;
const children = <button>Test</button>;

beforeAll(() => {
	targetContainer = document.createElement("div");
	document.body.appendChild(targetContainer);
});

afterAll(() => {
	targetContainer.remove();
});

test("should close the modal on button click", () => {
	const closeCallbackStub = jest.fn();

	render(
		<Dialog
			closeCallback={closeCallbackStub}
			targetContainer={targetContainer}
		>
			{children}
		</Dialog>
	);

	fireEvent.click(screen.getByTestId("close-button"));

	expect(closeCallbackStub).toHaveBeenCalled();
});

describe("should render the dialog", () => {
	test("with the given title", () => {
		render(
			<Dialog
				closeCallback={() => {}}
				targetContainer={targetContainer}
				title="Title"
			>
				{children}
			</Dialog>
		);

		expect(screen.getByTestId("title")).toHaveTextContent("Title");
		expect(screen.getByTestId("body").innerHTML.toString()).toBe(
			"<button>Test</button>"
		);
	});

	test("without a title", () => {
		render(
			<Dialog closeCallback={() => {}} targetContainer={targetContainer}>
				{children}
			</Dialog>
		);

		expect(screen.queryByTestId("title")).not.toBeInTheDocument();
		expect(screen.getByTestId("body").innerHTML.toString()).toBe(
			"<button>Test</button>"
		);
	});
});
