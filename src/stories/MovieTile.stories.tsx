import { Meta, StoryObj } from "@storybook/react";
import MovieTile from "../components/MovieTile";

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
			genres: ["Action", "Crime"],
			image: {
				url: "http://localhost:3000/images/pulp_fiction.jpg",
				altText: "Pulp Fiction Image",
			},
			name: "Pulp Ficiton",
			year: 2004,
		},
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
