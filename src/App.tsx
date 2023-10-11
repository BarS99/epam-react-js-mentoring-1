import styles from "./App.module.scss";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";

const App = () => {
	return (
		<div className={styles.app}>
			<RouterProvider router={Router} />
			<div id="root-dialog"></div>
		</div>
	);
};

export default App;
