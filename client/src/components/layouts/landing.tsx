import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<section className="bg-dark container-fluid">
			<div className="row">
				<div
					className="col-12 d-flex flex-column justify-content-center align-items-center"
					style={{ height: "91.7vh" }}
				>
					<div className="row justify-content-center my-5">
						<h1 className="display-lg-4 display-md-3 display-1 text-light font-weight-bold text-center">
							Developer Connector
						</h1>
						<h4 className="px-2 lead text-light text-center">
							Create a developer profile/portfolio, share posts and get help
							from other developers
						</h4>
					</div>
					<div className="row justify-content-center my-2">
						<Link to="/signup" className="btn btn-lg btn-primary mx-2">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-lg btn-secondary mx-2">
							Login
						</Link>
					</div>
					<div className="row my-5 py-3"></div>
				</div>
			</div>
		</section>
	);
}
