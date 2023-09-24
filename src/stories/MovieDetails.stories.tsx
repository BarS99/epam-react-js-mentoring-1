import { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../components/MovieDetails";

const meta: Meta<typeof MovieDetails> = {
	title: "MovieDetails",
	component: MovieDetails,
	args: {
		data: {
			name: "Pulp Fiction",
			description: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men 
			who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). 
			Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when 
			Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid 
			by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising 
			of a series of funny, bizarre and uncalled-for incidents.—Soumitra`,
			duration: "2h 34min",
			genres: ["Action", "Crime"],
			image: {
				url: "http://localhost:3000/images/pulp_fiction.jpg",
				altText: "Pulp Fiction Image",
			},
			rating: 8.9,
			year: 2004,
		},
		orientation: 'row'
	},
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

export const Default: Story = {};
