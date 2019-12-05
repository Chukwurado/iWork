import React, { useState, useEffect } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

import classes from "./SignIn.module.css";
import { stat } from "fs";

const SignIn = props => {
  const [isJobSeeker, setIsJobSeeker] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const inputChanged = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signIn = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });
    const routeName = isJobSeeker ? "user/" : "company/";

    try {
      const res = await axios.post(`api/auth/${routeName}`, body, config);
      const status = res.status;
      const token = res.data.token;
      console.log("response", res.status);
      if (status === 200) {
        console.log("successfully signed in");
        if (routeName === "user/") {
        } else {
        }
      }
    } catch (err) {
      const errorMessage = err.response.data.errors[0].msg;
      alert(errorMessage);
      console.log("Querry error", err.response.data);
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
  inputs = (
    <>
      <form onSubmit={signIn}>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input
            className={classes.Input}
            type="email"
            onChange={inputChanged}
            name="email"
          />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="password">
            Password
          </label>
          <input
            className={classes.Input}
            type="password"
            onChange={inputChanged}
            name="password"
          />
        </div>
        <button type="submit">SignIn</button>
      </form>
    </>
  );

  return (
    <div className={classes.SignIn}>
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
        <div className={classes.Form}>
          <form>{inputs}</form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
