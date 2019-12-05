import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions/auth";

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
          <Link to="/compDashboard">Comp Profile</Link>
        </li>
        <li className={classes.NavItem} onClick={props.closed}>
          <Link to="/login">Sign In</Link>
        </li>
        <li className={classes.NavItem} onClick={props.closed}>
          <Link to="/register">Register</Link>
        </li>
        <li className={classes.NavItem} onClick={props.logout}>
          <Link to="/#!">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, { logout })(NavItems);
