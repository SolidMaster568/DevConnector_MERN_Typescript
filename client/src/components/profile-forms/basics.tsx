import react, {ChangeEvent} from "react";
import React from "react";

function Basics({onChange, company, website, location, githubusername, bio, status}: basicsProps) {
    return (
        <>
            <h2 className="text-primary">Basic Info:</h2>
            <div className="form-group">
                <select name="status" value={status} onChange={onChange} className="form-control">
                    <option>* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Intern">Intern</option>
                </select>
                <small className="form-text">
                    Give us an idea of where you are at in your career
                </small>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={company}
                    onChange={onChange}
                    className="form-control"
                />
                <small className="form-text">
                    Could be your own company or one you work for
                </small>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Website"
                    name="website"
                    value={website}
                    onChange={onChange}
                    className="form-control"
                />
                <small className="form-text">
                    Could be your own or a company website
                </small>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={onChange}
                    className="form-control"
                />
                <small className="form-text">
                    City & state suggested (eg. Boston, MA)
                </small>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={githubusername}
                    onChange={onChange}
                    className="form-control"
                />
                <small className="form-text">
                    If you want your latest repos and a Github link, include your
                    username
                </small>
            </div>
            <div className="form-group">
          <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={onChange}
              className="form-control"
          />
                <small className="form-text">Tell us a little about yourself</small>
            </div>
            <hr className="bg-primary"/>
        </>
    )
}

export default Basics;

interface basicsProps {
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    company?: string;
    website?: string;
    location?: string;
    githubusername?: string;
    bio?: string;
    status: string;
}