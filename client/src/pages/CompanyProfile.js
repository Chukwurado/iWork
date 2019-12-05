import React, { Component } from "react";
import Navigation from "../components/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Sidebar from "../components/Sidebar";

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: "",
        profilePic: ""
      }
    };
  }

  render() {
    return (
      <div>
        <div>
          <Router>
            <Navigation />
          </Router>
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
