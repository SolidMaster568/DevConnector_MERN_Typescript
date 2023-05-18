import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../store/actions/profile";
import { AppState } from "../../store/configureStore";
import { AuthState } from "../../store/reducers/auth";
import { ProfileState } from "../../store/reducers/profile";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

function DashBoard({ getCurrentUserProfile, auth, profile }: DashBoardProps) {
	useEffect(() => getCurrentUserProfile(), [getCurrentUserProfile]);

	const { user } = auth;
	const { loading } = profile;

	if (loading) {
		return (
			<div className="loader-page">
				<MoonLoader loading={true} size={100} color="#00A3B8" />
			</div>
		);
	} else {
		return (
			<div>
				<h1 className="display-3 text-secondary font-weight-bold">Dashboard</h1>
				{profile ? (
					<div className="d-flex">
						<p className="lead mr-2 p-0 mb-0">Welcome {user && user.name} ✨</p>
						<Link to={`/profile/${user!._id}`} className="btn btn-info mr-2">
							View Profile
						</Link>
					</div>
				) : (
					<div className="d-flex">
						<p className="lead mr-2 p-0 mb-0">no profile found 🤨</p>
						<Link to="/create-profile" className="btn btn-info">
							create now !
						</Link>
					</div>
				)}
				<div className="alert alert-warning text-center my-5">
					under construction notifications zone 😃
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(DashBoard);

interface DashBoardProps {
	getCurrentUserProfile: VoidFunction;
	auth: AuthState;
	profile: ProfileState;
}
