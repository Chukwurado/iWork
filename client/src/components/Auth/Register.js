import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../../store/actions/auth";

import classes from "./Register.module.css";

const Register = props => {
    const [isJobSeeker, setIsJobSeeker] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        setErrors({ ...props.errors });
    }, [props.errors]);
    console.log(errors);

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        name
    } = formData;

    const inputChanged = e => {
        setErrors({ ...errors, [e.target.name]: "" });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async e => {
        e.preventDefault();
        props.register(formData, isJobSeeker);
    };

    const topClicked = user => {
        if (user === "jobseeker") {
            setIsJobSeeker(true);
        } else {
            setIsJobSeeker(false);
        }
    };

    if (props.userAuthenticated) {
        props.history.push("/me");
        // return <Redirect to="/me"></Redirect>;
    }
    if (props.companyAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }
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
                    {errors.firstName && (
                        <p className={classes.ErrorMsg}>{errors.firstName}</p>
                    )}
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
                    {errors.lastName && (
                        <p className={classes.ErrorMsg}>{errors.lastName}</p>
                    )}
                </div>
            </>
        );
    } else {
        inputs = (
            <>
                <div className={classes.FormGroup}>
                    <label className={classes.Label} htmlFor="name">
                        Name
                    </label>
                    <input
                        className={classes.Input}
                        type="text"
                        value={name}
                        name="name"
                        onChange={inputChanged}
                    />
                    {errors.name && (
                        <p className={classes.ErrorMsg}>{errors.name}</p>
                    )}
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
                            {errors.email && (
                                <p className={classes.ErrorMsg}>
                                    {errors.email}
                                </p>
                            )}
                        </div>
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
                            {errors.password && (
                                <p className={classes.ErrorMsg}>
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className={classes.FormGroup}>
                            <label
                                className={classes.Label}
                                htmlFor="confirmPassword"
                            >
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
                        <button className="btn btn-primary" type="submit">
                            Register
                        </button>
                    </form>
                </div>
                <div className={classes.HaveAccount}>
                    <p>
                        Have An Account? <Link to="/login">Sign In</Link>
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

export default connect(mapStateToProps, { register })(Register);
