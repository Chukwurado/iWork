import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavItems.module.css";

const NavItems = props => {
    return (
        <div>
            <ul className={classes.NavItems}>
                <li className={classes.NavItem} onClick={props.closed}>
                    <Link to="/jobs">Jobs</Link>
                </li>
                <li className={classes.NavItem} onClick={props.closed}>
                    <Link to="/me">Profile</Link>
                </li>
                <li className={classes.NavItem} onClick={props.closed}>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li className={classes.NavItem} onClick={props.closed}>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavItems;
