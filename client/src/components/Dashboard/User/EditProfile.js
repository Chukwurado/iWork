import React, { useState } from "react";

import classes from "./EditProfile.module.css";
import axios from "axios";

const EditProfile = props => {
    const [formData, setFormData] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        title: props.title ? props.title : "",
        bio: props.bio ? props.bio : "",
        github: props.github ? props.github : "",
        linkedIn: props.linkedIn ? props.linkedIn : "",
        website: props.website ? props.website : ""
    });
    const {
        firstName,
        lastName,
        title,
        bio,
        github,
        linkedIn,
        website
    } = formData;

    const inputChanged = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const body = JSON.stringify({
                firstName,
                lastName,
                title,
                bio,
                github,
                linkedIn,
                website
            });
            const res = await axios.post("api/profile/user", body, config);
            console.log(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
        props.closeModal();
    };
    return (
        <div className={classes.EditProfile}>
            <form onSubmit={submitForm}>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="title">
                        Title
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="title"
                        value={title}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="bio">
                        About Me
                    </label>
                    <textarea
                        className={classes.Input}
                        type="text"
                        name="bio"
                        value={bio}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="linkedIn">
                        LinkedIn
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="linkedIn"
                        value={linkedIn}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="github">
                        Github
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="github"
                        value={github}
                        onChange={inputChanged}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="website">
                        Website
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        name="website"
                        value={website}
                        onChange={inputChanged}
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => props.closeModal()}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProfile;
