import React, { useEffect } from "react";
import "./bootstrap.scss";
import { loadUser } from "./store/actions/auth";
import store from "./store/configureStore";

import Navbar from "./components/layouts/navbar";
import Routes from "./routes";
import { RouteChildrenProps, withRouter } from "react-router-dom";

function App(props: RouteChildrenProps) {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	useEffect(() => {
		store.dispatch({ type: "CLEAR_ALERTS" });
	}, [props.location]);

	return (
		<>
			<Navbar />
			<Routes />
		</>
	);
}

export default withRouter(App);
