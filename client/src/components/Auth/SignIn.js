import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./SignIn.module.css";

const SignIn = props => {
  const [isJobSeeker, setIsJobSeeker] = useState(true);

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
      <form>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="email">
            Email
          </label>
          <input className={classes.Input} type="email" />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="password">
            Password
          </label>
          <input className={classes.Input} type="password" />
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
