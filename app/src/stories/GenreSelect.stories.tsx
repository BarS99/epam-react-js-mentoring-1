import { Meta, StoryObj } from "@storybook/react";
import GenreSelect from "../components/GenreSelect";

const genres = ["Action", "Drama", "Horror", "Romance"];

const meta: Meta<typeof GenreSelect> = {
	title: "GenreSelect",
	component: GenreSelect,
	argTypes: {
		selectedGenre: {
			options: [null, ...genres],
		},
		onSelect: {
			defaultValue: () => {},
			action: "Genre Selected",
		},
	},
	args: {
		genres,
	},
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const Empty: Story = {
	name: "No Genre",
	args: {
		selectedGenre: null,
	},
};

export const Selected: Story = {
	name: "Selected Genre",
	args: {
		selectedGenre: "Action",
	},
};
