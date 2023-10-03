import { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../components/MovieDetails";

const meta: Meta<typeof MovieDetails> = {
	title: "MovieDetails",
	component: MovieDetails,
	args: {
		data: {
			poster_path: "http://localhost:3000/images/pulp_fiction.jpg",
			title: "Pulp Fiction",
			release_date: "2004",
			vote_average: 8.9,
			runtime: 123,
			genres: ["action", "crime"],
			overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men 
			who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). 
			Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when 
			Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid 
			by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising 
			of a series of funny, bizarre and uncalled-for incidents.—Soumitra`,
			id: 1,
		},
		orientation: "row",
	},
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

export const Default: Story = {};
