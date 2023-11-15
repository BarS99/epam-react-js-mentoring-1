import { Meta, StoryObj } from "@storybook/react";
import Counter from "../components/Counter";

const meta: Meta<typeof Counter> = {
	title: "Counter",
	component: Counter,
	argTypes: {
		initialValue: {
			control: { disable: true },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
	render: () => <Counter initialValue={0} />,
};
