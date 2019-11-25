import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavItems.module.css";

const NavItems = () => {
    return (
        <div>
            <ul className={classes.NavItems}>
                <li className={classes.NavItem}>
                    <Link>Jobs</Link>
                </li>
                <li className={classes.NavItem}>
                    <Link>Profile</Link>
                </li>
                <li className={classes.NavItem}>
                    <Link>Sign In</Link>
                </li>
                <li className={classes.NavItem}>
                    <Link>Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavItems;
