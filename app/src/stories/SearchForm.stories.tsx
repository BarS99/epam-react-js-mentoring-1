import { Meta, StoryObj } from "@storybook/react";
import SearchForm from "../components/SearchForm";

const meta: Meta<typeof SearchForm> = {
	title: "SearchForm",
	component: SearchForm,
	argTypes: {
		initSearchQuery: {
			control: { disable: true },
		},
		onSearch: {
			defaultValue: (): void => {},
			action: "Search Query",
		},
	},
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Empty: Story = {
	name: "Empty Query",
	args: {
		initSearchQuery: "",
	},
};

export const Filled: Story = {
	name: "Filled Query",
	args: {
		initSearchQuery: "Search Query",
	},
};
