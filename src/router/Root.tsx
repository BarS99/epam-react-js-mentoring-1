import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		document.body.scrollTo(0, 0);
	}, [pathname]);

	return <Outlet />;
};

export default Root;
