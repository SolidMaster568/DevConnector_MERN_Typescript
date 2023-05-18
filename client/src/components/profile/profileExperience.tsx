import moment from "moment";
import React from "react";
import {ExperienceType} from "../../global.types";

function ProfileExperience(props: { experience: ExperienceType }) {
    const {
        company,
        jobTitle,
        location,
        to,
        from,
        description,
    } = props.experience;

    return (
        <div className="col-12 col-md-6 p-1 p-md-3">
            <div className="card bg-primary text-white shadow-sm">
                <div className="card-header"> {moment(from).format("MMM DD YYYY")} -{" "}
                    {to ? moment(to).format("MMM DD YYYY") : "Now"}</div>
                <div className="card-body">
                    <h3 className="card-title">{company}</h3>
                    <p>
                        <strong>Position: </strong> {jobTitle}
                    </p>
                    <p>
                        <strong>Location: </strong> {location}
                    </p>
                    <p>
                        <strong>Description: </strong> {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileExperience;
