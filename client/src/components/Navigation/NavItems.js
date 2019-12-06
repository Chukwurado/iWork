import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions/auth";

import classes from "./NavItems.module.css";

const NavItems = props => {
    const userAuthLinks = (
        <>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/jobs">Jobs</Link>
            </li>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/me">Profile</Link>
            </li>
            <li className={classes.NavItem} onClick={props.logout}>
                <Link to="/#!">Logout</Link>
            </li>
        </>
    );
    const companyAuthLink = (
        <>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/jobs">Jobs</Link>
            </li>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/me">Dashboard</Link>
            </li>
            <li className={classes.NavItem} onClick={props.logout}>
                <Link to="/#!">Logout</Link>
            </li>
        </>
    );
    const guestLink = (
        <>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/login">Sign In</Link>
            </li>
            <li className={classes.NavItem} onClick={props.closed}>
                <Link to="/register">Register</Link>
            </li>
        </>
    );

    return (
        <div>
            <ul className={classes.NavItems}>
                {props.userAuthenticated
                    ? userAuthLinks
                    : props.companyAuthenticated
                    ? companyAuthLink
                    : guestLink}
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    userAuthenticated: state.auth.userAuthenticated,
    companyAuthenticated: state.auth.companyAuthenticated
});

export default connect(mapStateToProps, { logout })(NavItems);
