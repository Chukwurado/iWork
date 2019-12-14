import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./MenuIcon.module.css";

const MenuIcon = props => {
    const { match } = props;
    return (
        <div className={classes.MenuIcon} onClick={props.clicked}>
            <div
                style={{
                    backgroundColor:
                        props.authenticated || !match.isExact
                            ? "black"
                            : "white"
                }}
            ></div>
            <div
                style={{
                    backgroundColor:
                        props.authenticated || !match.isExact
                            ? "black"
                            : "white"
                }}
            ></div>
            <div
                style={{
                    backgroundColor:
                        props.authenticated || !match.isExact
                            ? "black"
                            : "white"
                }}
            ></div>
        </div>
    );
};

export default withRouter(MenuIcon);
