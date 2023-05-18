import React from "react";
import {Link} from "react-router-dom";
import {ProfileType} from "../../global.types";

const ProfileItem = ({profile}: ProfileItemProps) => {
    const {user, status, company, location, skills} = profile;
    const {name, avatar} = user!;
    return (
        <div className="card p-2 shadow-sm mr-2 mb-2 ml-0 flex-fill">
            <div className="d-flex">
                <div className="mr-3" style={{transform: "rotate(0)"}}>
                    <div className="d-flex justify-content-center">
                        <img src={avatar} alt="profile picture" className="thumbnail-lg"/>
                    </div>
                    <h5 className="text-center mt-3 text-capitalize">{name}</h5>
                    <Link to={`/profile/${user!._id}`} className="stretched-link">
                    </Link>
                </div>
                <div className="mx-2">
                    <p className="my-1">
                        {status} {company && <span> at {company}</span>}
                    </p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    <h5 className="mt-2 mb-1 text-primary">Skills: </h5>

                    <div className="p-0" style={{lineHeight: "20px"}}>
                        {skills.slice(0, 3).map((skill, index) => (
                            <p key={index} className="m-0 p-0">
                                <i className="fas fa-check text-primary"/> {skill}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProfileItemProps {
    profile: ProfileType;
}

export default ProfileItem;
