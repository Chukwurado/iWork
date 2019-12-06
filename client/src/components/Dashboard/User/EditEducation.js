import React, { useState } from "react";

import classes from "./AddExperience.module.css";
import axios from "axios";

const EditEducation = props => {
    const [formData, setFormData] = useState({
        school: props.education.school,
        fieldofstudy: props.education.fieldofstudy,
        degree: props.education.degree,
        from: props.education.from,
        to: props.education.to ? props.education.to : ""
    });

    const [errors, setErrors] = useState({
        school: "",
        fieldofstudy: "",
        degree: "",
        from: ""
    });

    const { school, fieldofstudy, degree, from, to } = formData;

    const inputChanged = e => {
        setErrors({ ...errors, [e.target.name]: "" });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: { "Content-type": "application/json" }
            };
            const body = JSON.stringify(formData);
            const res = await axios.put(
                "api/education/" + props.education.id,
                body,
                config
            );
            console.log(res.data);
            props.closeModal();
        } catch (err) {
            console.error(err.response.data.errors);
            const errs = err.response.data.errors;
            const errorsObj = {};
            if (errs) {
                errs.forEach(error => {
                    errorsObj[error.param] = error.msg;
                });
            }
            setErrors({ ...errorsObj });
        }
    };

    return (
        <div className={classes.EditProfile}>
            <form onSubmit={submitForm}>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="school">
                        School
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="school"
                        onChange={inputChanged}
                        value={school}
                    />
                    {errors.school && (
                        <p className={classes.ErrorMsg}>{errors.school}</p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="fieldofstudy">
                        Major
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={inputChanged}
                    />
                    {errors.fieldofstudy && (
                        <p className={classes.ErrorMsg}>
                            {errors.fieldofstudy}
                        </p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="degree">
                        Degree
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="degree"
                        onChange={inputChanged}
                        value={degree}
                    />
                    {errors.degree && (
                        <p className={classes.ErrorMsg}>{errors.degree}</p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="from">
                        From
                    </label>
                    <input
                        className={classes.Input}
                        type="date"
                        name="from"
                        value={from}
                        onChange={inputChanged}
                    />
                </div>
                {errors.from && (
                    <p className={classes.ErrorMsg}>{errors.from}</p>
                )}
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="to">
                        To
                    </label>
                    <input
                        className={classes.Input}
                        type="date"
                        name="to"
                        value={to}
                        onChange={inputChanged}
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={props.closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditEducation;
