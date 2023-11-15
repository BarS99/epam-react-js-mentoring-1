import { useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect } from "react";

const App = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useLocation();

	useEffect(() => {
		document.body.scrollTo(0, 0);
	}, [pathname]);

	return <div className={styles["app"]}>{children}</div>;
};

export default App;
