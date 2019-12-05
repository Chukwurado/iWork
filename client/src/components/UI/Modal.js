import React from "react";

import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const Modal = props => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.closeModal} />
            <div
                className={classes.Modal}
                style={{ display: props.show ? "inherit" : "none" }}
            >
                {props.children}
            </div>
        </>
    );
};

export default Modal;
