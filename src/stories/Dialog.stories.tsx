import { Meta, StoryObj } from "@storybook/react";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

const meta: Meta<typeof Dialog> = {
	title: "Dialog",
	component: Dialog,
	argTypes: {
		closeCallback: {
			defaultValue: (): void => {},
			action: "Close Dialog",
		},
	},
	args: {
		title: "Delete Movie",
		children: [
			<>
				<p>Are you sure you want to delete this movie?</p>
				<div
					style={{
						marginTop: "3.25rem",
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<Button type="button">Confirm</Button>
				</div>
			</>,
		],
	},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
