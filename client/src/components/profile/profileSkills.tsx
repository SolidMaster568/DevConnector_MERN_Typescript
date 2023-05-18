import React from "react";
import {ProfileType} from "../../global.types";

function ProfileSkills(props: { profile: ProfileType }) {
    const {skills, ...user} = props.profile;
    const name = user.user!.name;

    return (
        <div className="jumbotron my-3">
            <h1 className="text-primary border-bottom border-primary mb-4">Skills:</h1>
            <div>
                {skills.map((skill, index) => (
                    <h5 key={index}>
                        <i className="fas fa-check text-primary"/> {skill}
                    </h5>
                ))}
            </div>
        </div>
    );
}

export default ProfileSkills;
