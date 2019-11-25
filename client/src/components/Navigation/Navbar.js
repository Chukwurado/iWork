import React from "react";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
    return (
        <header className={classes.Navbar}>
            <div className={classes.Logo}>
                <h1>iWork</h1>
            </div>
            <nav className={classes.ShowOnDesktop}>
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
            </nav>
        </header>
    );
};

export default Navbar;
