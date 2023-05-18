import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { ExperienceType } from "../../global.types";

const AddExperience = ({
  submitter,
  deleter,
  initialData,
}: AddExperienceProps) => {
  const initialState: ExperienceType = {
    _id: undefined,
    company: "",
    jobTitle: "",
    location: "",
    from: new Date(),
    to: undefined,
    current: false,
    description: "",
  };

  const [formData, setFormData] = useState<ExperienceType>(
    initialData ? initialData : initialState
  );

  const {
    company,
    jobTitle,
    location,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.type === "date") {
      setFormData({
        ...formData,
        [e.currentTarget.name]: new Date(e.currentTarget.value),
      });
      return;
    }
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submit = () => {
    submitter(formData);
    setFormData(initialState);
  };

  const handleDeleter = () => {
    deleter(formData);
  };

  return (
    <div className="form">
      <div className="form-group">
        <input
          type="text"
          placeholder="* Job Title"
          name="jobTitle"
          value={jobTitle}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="* Company"
          name="company"
          value={company}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <h4>From Date</h4>
        <input
          type="date"
          name="from"
          value={moment(from).format("YYYY-MM-DD")}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <p>
          <input
            type="checkbox"
            name="current"
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
            }}
          />{" "}
          Current Job
        </p>
      </div>
      <div className="form-group">
        <h4>To Date</h4>
        <input
          type="date"
          name="to"
          value={moment(to).format("YYYY-MM-DD")}
          onChange={onChange}
          disabled={current}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          cols={30}
          rows={5}
          placeholder="Job Description"
          value={description}
          onChange={onChange}
        />
      </div>
      <div className="btn-group">
        <button className="btn btn-primary my-1" onClick={submit}>
          save
        </button>
        {initialData ? (
          <button className="btn btn-danger my-1" onClick={handleDeleter}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default AddExperience;

interface AddExperienceProps {
  submitter: (experience: ExperienceType) => void;
  deleter: (experience: ExperienceType) => void;
  initialData?: ExperienceType;
}
