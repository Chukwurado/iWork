import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./Main";
import About from "./about";
import Jobs from "./jobs";
import Applications from "./applications";

import Logo from "./nasamoonrock.jpg";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div class="container-fluid">
          <header>
            <div class="row">header Call / Navigation Bar</div>
          </header>
          <br />

          <div class="row border">
            <div class="col-md-3 border border-dark">
              <br />
              <img src={Logo} alt="Company Logo" class="rounded img-fluid" />
              <br /> <br />
              <nav class="nav nav-pills nav-fill flex-column">
                <Link to={"/about"} className="nav-item nav-link">
                  About
                </Link>
                <Link to={"/jobs"} className="nav-item nav-link">
                  Jobs
                </Link>
                <Link to={"/applications"} className="nav-item nav-link">
                  Applicants
                </Link>
              </nav>
            </div>
            <div class="col-md-9 border border-dark">
              <br />
              <div class="row">
                <div class="col-sm-3" />
                <div class="col-sm-6">
                  {" "}
                  <h1 class="font-weight-bold text-uppercase text-center bg-dark text-white">
                    Company Name
                  </h1>
                </div>
                <div class="col-sm-3" />
              </div>
              <br />

              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/About" component={About} />
                <Route path="/Jobs" component={Jobs} />
                <Route path="/Applications" component={Applications} />
              </Switch>
            </div>
          </div>

          <br />
          <footer class="page-footer font-small blue pt-4">
            <div class="row">footer call</div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
