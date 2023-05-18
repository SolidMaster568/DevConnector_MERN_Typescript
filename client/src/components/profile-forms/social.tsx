import React from "react";
import {ChangeEvent} from "react";
import {ProfileType} from "../../global.types";

function Social({
                    formData,
                    setFormData,
                }: {
    formData: ProfileType;
    setFormData: (value: React.SetStateAction<ProfileType>) => void;
}) {
    const social = formData.social;

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const [obj, key] = e.currentTarget.name.split(".");
        //@ts-ignore
        const field = formData[obj];
        setFormData({
            ...formData,
            [obj]: {...field, [key]: e.currentTarget.value},
        });
    };

    return (
        <>
            <h2 className="text-primary">Social:</h2>
            <div className="my-2">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fab fa-twitter"/>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Twitter URL"
                        name="social.twitter"
                        value={social?.twitter}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>

                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fab fa-youtube"/>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="YouTube URL"
                        name="social.youtube"
                        value={social?.youtube}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>

                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fab fa-linkedin"/>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Linkedin URL"
                        name="social.linkedin"
                        value={social?.linkedIn}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
            </div>
            <hr className="bg-primary"/>
        </>
    );
}

export default Social;
