import { Meta, StoryObj } from "@storybook/react";
import MovieTile from "../components/MovieTile";
import { Movie } from "../interfaces/movie.interface";

const meta: Meta<typeof MovieTile> = {
	title: "MovieTile",
	component: MovieTile,
	argTypes: {
		onClick: {
			defaultValue: (): void => {},
			action: "Movie Tile Click",
		},
	},
	args: {
		data: {
			id: 123,
			genres: ["Action", "Crime"],
			poster_path: "http://localhost:3000/images/pulp_fiction.jpg",
			title: "Pulp Ficiton",
			release_date: "2004",
			overview: "",
			runtime: 123,
		} as Movie,
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: "324px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof MovieTile>;

export const Default: Story = {};
