import React, { useState } from "react";
import axios from "axios";

import classes from "./EditProfile.module.css";

const EditExperience = props => {
    const [formData, setFormData] = useState({
        title: props.experience.title,
        company: props.experience.company,
        location: props.experience.location ? props.experience.location : "",
        from: props.experience.from,
        to: props.experience.to ? props.experience.to : "",
        description: props.experience.description
            ? props.experience.description
            : "",
        current: false
    });

    const [errors, setErrors] = useState({
        title: "",
        company: "",
        from: ""
    });

    const {
        title,
        company,
        location,
        from,
        to,
        description,
        current
    } = formData;

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
                "api/experience/" + props.experience.id,
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
                    <label className={classes.Label} htmlFor="company">
                        Company
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="company"
                        onChange={inputChanged}
                        value={company}
                    />
                    {errors.company && (
                        <p className={classes.ErrorMsg}>{errors.company}</p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="title">
                        Job Title
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="title"
                        value={title}
                        onChange={inputChanged}
                    />
                    {errors.title && (
                        <p className={classes.ErrorMsg}>{errors.title}</p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="location">
                        location
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="location"
                        placeholder="Eg. New York, NY"
                        value={location}
                        onChange={inputChanged}
                    />
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
                    {errors.from && (
                        <p className={classes.ErrorMsg}>{errors.from}</p>
                    )}
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="current">
                        Current
                    </label>
                    <input
                        className={classes.Input}
                        type="checkbox"
                        name="current"
                        onChange={() =>
                            setFormData({ ...formData, current: !current })
                        }
                    />
                </div>
                {!current && (
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
                )}
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className={classes.Input}
                        type="text"
                        name="description"
                        value={description}
                        onChange={inputChanged}
                        maxLength="1500"
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => props.closeModal()}>Cancel</button>
            </form>
        </div>
    );
};

export default EditExperience;
