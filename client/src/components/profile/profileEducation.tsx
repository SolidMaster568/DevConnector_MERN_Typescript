import moment from "moment";
import React from "react";
import {EducationType} from "../../global.types";

function ProfileEducation(props: { education: EducationType }) {
    const {
        school,
        degree,
        fieldOfStudy,
        to,
        from,
        description,
    } = props.education;
    return (
        <div className="col-12 col-md-6 p-1 p-md-3">
            <div className="card bg-success text-white shadow-sm">
                <div className="card-header"> {moment(from).format("MMM DD YYYY")} -{" "}
                    {to ? moment(to).format("MMM DD YYYY") : "Now"}</div>
                <div className="card-body">
                    <h3 className="card-title">{school}</h3>
                    <p className="card-text">
                        <strong>Degree: </strong> {degree}
                    </p>
                    <p className="card-text">
                        <strong>Field Of Study: </strong> {fieldOfStudy}
                    </p>
                    <p className="card-text">
                        <strong>Description: </strong> {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileEducation;
