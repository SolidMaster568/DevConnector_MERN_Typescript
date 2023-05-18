import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {connect} from "react-redux";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ProfileType} from "../../global.types";
import {AppState} from "../../store/configureStore";
import {
    createOrUpdateProfile,
    getCurrentUserProfile,
    deleteAccount,
} from "../../store/actions/profile";
import ExperienceAndEducation from "./expirenceAndEducation";
import Skills from "./skills";
import Social from "./social";
import {MoonLoader} from "react-spinners";
import Basics from "./basics";

function CreateProfile({
                           profileData,
                           profileLoading,
                           createOrUpdateProfile,
                           getCurrentUserProfile,
                           deleteAccount,
                           history,
                       }: createProfileProps) {
    useEffect(() => {
        getCurrentUserProfile();
    }, [getCurrentUserProfile]);

    const [formData, setFormData] = useState<ProfileType>(
        profileData
            ? profileData
            : {
                _id: undefined,
                user: undefined,
                skills: [""],
                status: "",
                bio: undefined,
                company: undefined,
                githubusername: undefined,
                location: undefined,
                social: {
                    youtube: undefined,
                    linkedIn: undefined,
                    twitter: undefined,
                },
                website: undefined,
                education: [],
                experience: [],
            }
    );

    useEffect(() => {
        if (profileData) setFormData(profileData);
    }, [profileData]);

    if (profileLoading) {
        return (
            <div className="loader-page">
                <MoonLoader loading={true} size={100} color="#00A3B8"/>
            </div>
        );
    }

    const {status, bio, company, githubusername, location, website} = formData;

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        createOrUpdateProfile(formData);
        history.push(`/profile/${profileData!.user!._id}`);
    };

    const deleteAccountHandler = () => {
        const confirmation = window.confirm(
            "are you sure you want to delete your account ?"
        );
        if (confirmation) deleteAccount();
    };

    return (
        <div>
            <h1 className="text-primary mb-3 border-bottom border-primary">Edit Profile</h1>
            <form className="form" onSubmit={onSubmit}>

                <Basics onChange={onChange} company={company} website={website} location={location}
                        githubusername={githubusername} bio={bio} status={status}/>

                <Skills formData={formData} setFormData={setFormData}/>

                <Social formData={formData} setFormData={setFormData}/>

                <ExperienceAndEducation formData={formData} setFormData={setFormData}/>

                <div className="my-1">
                    <button
                        type="button"
                        className="btn btn-danger my-1"
                        onClick={deleteAccountHandler}
                    >
                        Delete Account
                    </button>
                </div>
                <button type="submit" className="btn btn-dark btn-fixed rounded-pill p-3 font-weight-bold">
                    Save ✅
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    profileData: state.profile.profile,
    profileLoading: state.profile.loading,
});

export default withRouter(connect(mapStateToProps, {
    createOrUpdateProfile,
    getCurrentUserProfile,
    deleteAccount,
})(CreateProfile));

interface createProfileProps extends RouteComponentProps {
    profileData: ProfileType | null;
    getCurrentUserProfile: VoidFunction;
    createOrUpdateProfile: (data: ProfileType) => void;
    deleteAccount: VoidFunction;
    profileLoading: boolean;
}
