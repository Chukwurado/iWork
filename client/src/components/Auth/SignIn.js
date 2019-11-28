import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./SignIn.module.css";

const SignIn = props => {
  const [isJobSeeker, setIsJobSeeker] = useState(true);

  useEffect(
    () => {
      // same as ComponentDidMount
    },
    [
      /**Putting values in here will make the function inside "useEffect" execute whenever the value is changed or updated. (kind of like ComponentDidUpdate) */
    ]
  );

  const signIn = () => {
    try {
      axios.get(`http://localhost:8000/api/profile/user/1`).then(res => {
        console.log("response", res);
        // const persons = res.data;
        // this.setState({ persons });
      });
    } catch (error) {
      // alert(error);
      console.log("Querry error", error);
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
          <input className={classes.Input} type="email" />
        </div>
        <div className={classes.FormGroup}>
          <label className={classes.Label} htmlFor="password">
            Password
          </label>
          <input className={classes.Input} type="password" />
        </div>
        <button  type="submit">
          SignIn
        </button>
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
