import React from "react";
import {ProfileType} from "../../global.types";
import {Link} from "react-router-dom";

const ProfileTop = (props: { profile: ProfileType }) => {
    const {status, company, location, website, social, bio, ...user} = props.profile;
    const {name, avatar} = user.user!;

    return (
        <div className="card bg-white p-2">
            <div className="d-flex flex-column flex-md-row flex-fill">
                <div className="mr-md-4 d-flex justify-content-center justify-content-md-start">
                    <img className="thumbnail-xl my-1" src={avatar} alt=""/>
                </div>
                <div className="mt-2 d-flex flex-column align-items-center align-items-md-start">
                    <h1 className="text-primary text-capitalize">{name}</h1>
                    <p className="lead mb-0">
                        {status} {company && <span> at {company}</span>}
                    </p>
                    {location && <p className="lead mb-0">{location}</p>}
                    {bio && <p className="lead mb-0">
                        <i className="fas fa-quote-left text-primary mr-2"/>
                        {bio}
                        <i className="fas fa-quote-right text-primary ml-2"/>
                    </p>}
                    <div className="my-3">
                        {website && (
                            <a href={website} target="_blank" rel="noopener noreferrer" className="mx-1">
                                <i className="fas fa-globe fa-2x"/>
                            </a>
                        )}
                        {social && social.twitter && (
                            <a
                                href={`https://www.twitter.com/${social.twitter}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mx-1"
                            >
                                <i className="fab fa-twitter fa-2x"/>
                            </a>
                        )}
                        {social && social.linkedIn && (
                            <a
                                href={`https://www.linkedin.com/in/${social.linkedIn}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mx-1"
                            >
                                <i className="fab fa-linkedin fa-2x"/>
                            </a>
                        )}
                        {social && social.youtube && (
                            <a
                                href={`https://www.youtube.com/user/${social.youtube}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mx-1"
                            >
                                <i className="fab fa-youtube fa-2x"/>
                            </a>
                        )}
                    </div>
                    <Link to="/create-profile" className="btn btn-info">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileTop;
