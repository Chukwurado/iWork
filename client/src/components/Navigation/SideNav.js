import React from "react";

import NavItems from "./NavItems";
import Backdrop from "../UI/Backdrop";

import classes from "./SideNav.module.css";

const SideNav = props => {
    let attached = [classes.SideNav, classes.Close];
    if (props.open) {
        attached = [classes.SideNav, classes.Open];
    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attached.join(" ")}>
                <div className={classes.Logo}>
                    <h2>iWork</h2>
                </div>
                <nav>
                    <NavItems closed={props.closed} />
                </nav>
            </div>
        </>
    );
};

export default SideNav;
