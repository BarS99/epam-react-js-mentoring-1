interface RootContainers {
	app: HTMLElement | null;
	dialog: HTMLElement | null;
}

export const rootContainers: RootContainers = {
	app: document.getElementById("root"),
	dialog: document.getElementById("root-dialog"),
};
