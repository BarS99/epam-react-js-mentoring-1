import { Meta, StoryObj } from "@storybook/react";
import SortControl from "../components/SortControl";

const options = [
	{ id: '1', value: "Release Date" },
	{ id: '2', value: "title" },
];

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
		selection: '1',
	},
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const Default: Story = {};
