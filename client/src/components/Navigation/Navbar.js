import React from "react";

import MenuIcon from "./MenuIcon";
import NavItems from "./NavItems";

import classes from "./Navbar.module.css";

const Navbar = props => {
    return (
        <header className={classes.Navbar}>
            <div className={classes.Logo}>
                <h1>iWork</h1>
            </div>
            <MenuIcon clicked={props.iconClicked} />
            <nav className={classes.ShowOnDesktop}>
                <NavItems />
            </nav>
        </header>
    );
};

export default Navbar;
