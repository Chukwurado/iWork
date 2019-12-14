import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/actions/auth";

import classes from "./SignIn.module.css";

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
        props.login(formData, isJobSeeker);
    };

    const topClicked = user => {
        if (user === "jobseeker") {
            setIsJobSeeker(true);
        } else {
            setIsJobSeeker(false);
        }
    };

    if (props.userAuthenticated) {
        return <Redirect to="/me"></Redirect>;
    }

    if (props.companyAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }

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
                                value={email}
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
                                value={password}
                            />
                        </div>
                        <button type="submit">SignIn</button>
                    </form>
                </div>
                <div className={classes.NeedAccount}>
                    <p>
                        Need An Account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userAuthenticated: state.auth.userAuthenticated,
    companyAuthenticated: state.auth.companyAuthenticated,
    loading: state.auth.loading,
    errors: state.auth.errors
});

export default connect(mapStateToProps, { login })(SignIn);
