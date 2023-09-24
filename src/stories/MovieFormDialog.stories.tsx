import { Meta, StoryObj } from "@storybook/react";
import { MovieForm } from "../components/MovieForm";
import Dialog from "../components/Dialog";

const genres = ["Action", "Crime", "Romance", "Horror"];

const meta: Meta<typeof MovieForm> = {
	title: "MovieFormDialog",
	component: MovieForm,
	argTypes: {
		onSubmit: {
			defaultValue: (): void => {},
			action: "Form Submit",
		},
	},
	args: {
		genres,
	},
	decorators: [
		(Story) => <Dialog closeCallback={() => {}}>{Story()}</Dialog>,
	],
};

export default meta;
type Story = StoryObj<typeof MovieForm>;

export const AddMovie: Story = {
	argTypes: {
		data: {
			table: {
				disable: true,
			},
		},
	},
};

export const EditMovie: Story = {
	args: {
		data: {
			date: "2004-01-01",
			selectedGenres: ["Action", "Crime"],
			overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men...`,
			rating: "8.9",
			runtime: "2h 34min",
			title: "Pulp Fiction",
			url: "https://www.imdb.com/title/tt0110912/",
		},
	},
};
