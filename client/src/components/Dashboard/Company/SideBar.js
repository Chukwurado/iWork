import React from "react";
import { Link } from "react-router-dom";

import classes from "./SideBar.module.css";

const SideBar = props => {
    return (
        <div className={classes.SideBar}>
            <ul>
                <li onClick={props.viewjobs}>
                    <Link to="/dashboard">View Jobs</Link>
                </li>
                <li onClick={props.postjob}>
                    <Link to="/dashboard">Post Jobs</Link>
                </li>
                <li>
                    <Link to="/editprofile">Edit Profile</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
