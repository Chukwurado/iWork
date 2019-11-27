import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Register.module.css";

const Register = props => {
  const [isJobSeeker, setIsJobSeeker] = useState(true);

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
          <input className={classes.Input} type="text" />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="lastName">
            Last Name
          </label>
          <input className={classes.Input} type="text" />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input className={classes.Input} type="email" />
        </div>
      </>
    );
  } else {
    inputs = (
      <>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="company">
            Company
          </label>
          <input className={classes.Input} type="text" />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input className={classes.Input} type="email" />
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
          <form>
            {inputs}
            <div className={classes.FormGroup}>
              <label className={classes.Label} htmlFor="password">
                Password
              </label>
              <input className={classes.Input} type="password" />
            </div>
            <div className={classes.FormGroup}>
              <label className={classes.Label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input className={classes.Input} type="password" />
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
