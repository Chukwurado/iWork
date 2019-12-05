import React, { useState } from "react";

import classes from "./EditCompanyInfo.module.css";
import axios from "axios";

const EditCompanyInfo = props => {
  const [formData, setFormData] = useState({
    name: props.name,
    overview: props.overview ? props.overview : "",
    industry: props.industry ? props.industry : "",
    headquaters: props.headquaters ? props.headquaters : "",
    type: props.type ? props.type : "",
    website: props.website ? props.website : "",
    yearFounded: props.yearFounded ? props.yearFounded : ""
    // companypicture: props.companypicture? props.companypicture:"",
  });
  const {
    name,
    overview,
    industry,
    headquaters,
    type,
    website,
    yearFounded
    // companypicture
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
        name,
        overview,
        industry,
        headquaters,
        type,
        website,
        yearFounded
        // companypicture
      });
      const res = await axios.post("api/profile/company", body, config);
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
          <label className={classes.Label} htmlFor="name">
            Name
          </label>
          <input
            className={classes.Input}
            type="text"
            name="name"
            value={name}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="overview">
            overview
          </label>
          <input
            className={classes.Input}
            type="text"
            name="overview"
            value={overview}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="industry">
            About Me
          </label>
          <textarea
            className={classes.Input}
            type="text"
            name="industry"
            value={industry}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="type">
            type
          </label>
          <input
            className={classes.Input}
            type="text"
            name="type"
            value={type}
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="headquaters">
            headquaters
          </label>
          <input
            className={classes.Input}
            type="text"
            name="headquaters"
            value={headquaters}
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
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="yearFounded">
            Year Founded
          </label>
          <input
            className={classes.Input}
            type="text"
            name="yearFounded"
            value={yearFounded}
            onChange={inputChanged}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => props.closeModal()}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCompanyInfo;
