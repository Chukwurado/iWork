import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import classes from "./Register.module.css";

const Register = props => {
  const [isJobSeeker, setIsJobSeeker] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {
    name,
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = formData;

  const inputChanged = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // const body = JSON.stringify({ firstName, lastName, email, password });
    const routeName = isJobSeeker ? "user" : "company";
    const body = isJobSeeker
      ? JSON.stringify({ firstName, lastName, email, password })
      : JSON.stringify({ name, email, password });
    try {
      const res = await axios.post(`api/${routeName}`, body, config);
      const status = res.status;
      if (status === 200) {
        alert("Successfully registered");
      }
      console.log(res.data);
    } catch (err) {
      const errorMessage = err.response.data.errors[0].msg;
      alert(errorMessage);
      console.error(err.response.data.errors);
    }
  };

  const topClicked = user => {
    if (user === "jobseeker") {
      setIsJobSeeker(true);
    } else {
      setIsJobSeeker(false);
    }
  };
  let inputs = null;
  if (isJobSeeker) {
    inputs = (
      <>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="firstName">
            First Name
          </label>
          <input
            className={classes.Input}
            type="text"
            value={firstName}
            name="firstName"
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
            value={lastName}
            name="lastName"
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input
            className={classes.Input}
            type="email"
            value={email}
            name="email"
            onChange={inputChanged}
          />
        </div>
      </>
    );
  } else {
    inputs = (
      <>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="name">
            Company
          </label>
          <input
            className={classes.Input}
            type="text"
            value={name}
            name="name"
            onChange={inputChanged}
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input
            className={classes.Input}
            type="email"
            value={email}
            name="email"
            onChange={inputChanged}
          />
        </div>
      </>
    );
  }
  return (
    <div className={classes.Register}>
      <div className={classes.Card}>
        <div className={classes.Tabs}>
          <div
            style={
              isJobSeeker
                ? { backgroundColor: "white" }
                : { backgroundColor: "#ccc" }
            }
            className={classes.Tab}
            onClick={() => topClicked("jobseeker")}
          >
            Job Seeker
          </div>
          <div
            style={
              !isJobSeeker
                ? { backgroundColor: "white" }
                : { backgroundColor: "#ccc" }
            }
            className={classes.Tab}
            onClick={() => topClicked("company")}
          >
            Company
          </div>
        </div>
        <div className={classes.TopMsg}>
          <h5>
            {isJobSeeker
              ? "Find the right job for you"
              : "Get connected to smart international students"}
          </h5>
        </div>
        <div className={classes.Form}>
          <form onSubmit={submitForm}>
            {inputs}
            <div className={classes.FormGroup}>
              <label className={classes.Label} htmlFor="password">
                Password
              </label>
              <input
                className={classes.Input}
                type="password"
                value={password}
                name="password"
                onChange={inputChanged}
              />
            </div>
            <div className={classes.FormGroup}>
              <label className={classes.Label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={classes.Input}
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={inputChanged}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
        <div>
          <p>
            Have An Account? <Link>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
