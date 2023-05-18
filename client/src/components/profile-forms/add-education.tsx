import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { EducationType } from "../../global.types";

function AddEducation({ submitter, deleter, initialData }: AddEducationProps) {
  const initialState: EducationType = {
    _id: undefined,
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: new Date(),
    to: undefined,
    current: false,
    description: "",
  };

  const [formData, setFormData] = useState<EducationType>(
    initialData ? initialData : initialState
  );

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    description,
    current,
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
          placeholder="* School or Bootcamp"
          name="school"
          value={school}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="* Degree or Certificate"
          name="degree"
          value={degree}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Field of Study"
          name="fieldOfStudy"
          value={fieldOfStudy}
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
            onChange={() => setFormData({ ...formData, current: !current })}
          />{" "}
          Current School
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
          placeholder="Program Description"
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
}

export default AddEducation;

interface AddEducationProps {
  submitter: (education: EducationType) => void;
  deleter: (education: EducationType) => void;
  initialData?: EducationType;
}
