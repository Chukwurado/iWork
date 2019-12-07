import React, { useState } from "react";
import axios from "axios";

import classes from "./PostJob.module.css";

const PostJob = props => {
  const [formData, setFormData] = useState({
    title: "",
    primaryrole: "",
    typeofposition: "",
    city: "",
    state: "",
    description: "",
    website: ""
  });

  const [errors, setErrors] = useState({
    title: "",
    primaryrole: "",
    typeofposition: "",
    description: ""
  });

  const {
    title,
    primaryrole,
    typeofposition,
    city,
    state,
    description,
    website
  } = formData;

  const inputChanged = e => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closePostJob = () => {
    props.showViewJobs();
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-type": "application/json" }
      };
      const body = JSON.stringify(formData);
      const res = await axios.post("api/jobs", body, config);
      console.log(res.data);
      closePostJob();
    } catch (err) {
      console.error(err);
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
    <div className={classes.PostJob}>
      <h3>POST JOB</h3>
      <form onSubmit={submitForm}>
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
          {errors.title && <p className={classes.ErrorMsg}>{errors.title}</p>}
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="primaryrole">
            Primary Role
          </label>
          <input
            className={classes.Input}
            type="text"
            name="primaryrole"
            onChange={inputChanged}
            value={primaryrole}
          />
          {errors.primaryrole && (
            <p className={classes.ErrorMsg}>{errors.primaryrole}</p>
          )}
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="typeofposition">
            Type of Position
          </label>
          <input
            className={classes.Input}
            type="text"
            name="typeofposition"
            placeholder="Internship, Full-time, Part-time"
            value={typeofposition}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="city">
            City
          </label>
          <input
            className={classes.Input}
            type="text"
            name="city"
            value={city}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="state">
            State
          </label>
          <input
            className={classes.Input}
            type="text"
            name="state"
            value={state}
            onChange={inputChanged}
          />
        </div>

        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="website">
            Job Post Website
          </label>
          <input
            className={classes.Input}
            type="text"
            name="website"
            value={website}
            onChange={inputChanged}
          />
        </div>

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
            maxLength="10000"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostJob;
