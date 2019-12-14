import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MenuIcon from "./MenuIcon";
import NavItems from "./NavItems";

import classes from "./Navbar.module.css";

const Navbar = props => {
    return (
        <header
            className={
                props.userAuthenticated || props.companyAuthenticated
                    ? classes.Navbar
                    : classes.NavbarUnAuthenticated
            }
        >
            <div className={classes.Logo}>
                <h1>
                    <Link to="/">iWork</Link>
                </h1>
            </div>
            <MenuIcon
                clicked={props.iconClicked}
                authenticated={
                    props.userAuthenticated || props.companyAuthenticated
                }
            />
            <nav className={classes.ShowOnDesktop}>
                <NavItems
                    authenticated={
                        props.userAuthenticated || props.companyAuthenticated
                    }
                />
            </nav>
        </header>
    );
};

const mapStateToProps = state => ({
    userAuthenticated: state.auth.userAuthenticated,
    companyAuthenticated: state.auth.companyAuthenticated
});

export default connect(mapStateToProps)(Navbar);
