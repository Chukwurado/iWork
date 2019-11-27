import React from "react";

import classes from "./MenuIcon.module.css";

const MenuIcon = props => {
    return (
        <div className={classes.MenuIcon} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default MenuIcon;
