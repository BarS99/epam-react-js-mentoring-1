import { Meta, StoryObj } from "@storybook/react";
import SortControl from "../components/SortControl";

const options = ["Release date", "Title"];

const meta: Meta<typeof SortControl> = {
	title: "SortControl",
	component: SortControl,
	argTypes: {
		selection: {
			options: options,
			control: "radio",
		},
		onChange: {
			defaultValue: (): void => {},
			action: "Sort Changed",
		},
	},
	args: {
		options,
		selection: "Release date",
	},
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const Default: Story = {};
