import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ProfileType, UserType} from "../../global.types";
import {AppState} from "../../store/configureStore";
import {getProfileById} from "../../store/actions/profile";
import {MoonLoader} from "react-spinners";
import ProfileExperience from "./profileExperience";
import ProfileEducation from "./profileEducation";
import ProfileTop from "./profileTop";
import ProfileAbout from "./profileSkills";
import ProfileGithubRepos from "./profileGithubRepos";

function Profile({
                     getProfileById,
                     profile,
                     isAuth,
                     currentUser,
                     loading,
                     match,
                 }: ProfileProps) {
    const userId = match.params.userId;

    useEffect(() => getProfileById(userId), [getProfileById, userId]);

    return (
        <div>
            {!profile || loading ? (
                <div className="loader-page">
                    <MoonLoader loading={true} size={100} color="#00A3B8"/>;
                </div>
            ) : (
                <>
                    <div className="my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="mt-4 mt-md-0">
                            <h1 className="text-primary border-bottom border-primary">Experience:</h1>
                            {profile.experience.length > 0 ? (
                                <div className="row">
                                    {profile.experience.map(experience => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className="mt-4 mt-md-0">
                            <h1 className="text-success border-bottom border-success">Education:</h1>
                            {profile.education.length > 0 ? (
                                <div className="row">
                                    {profile.education.map(education => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>

                        {profile.githubusername && (
                            <ProfileGithubRepos username={profile.githubusername}/>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    profile: state.profile.profile!,
    isAuth: state.auth.isAuthenticated,
    currentUser: state.auth.user!,
    loading: state.profile.loading,
});

export default withRouter(
    connect(mapStateToProps, {getProfileById})(Profile)
);

interface ProfileProps extends RouteComponentProps<{ userId: string }> {
    getProfileById: (profileId: string) => void;
    profile: ProfileType;
    loading: boolean;
    isAuth: boolean;
    currentUser: UserType;
}
