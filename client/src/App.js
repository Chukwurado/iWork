import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navigation/Navbar";
import SideNav from "./components/Navigation/SideNav";
import Register from "./components/Auth/Register";
import SignIn from "./components/Auth/SignIn";
import UserDashboard from "./components/Dashboard/UserDashboard";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";

import store from "./store";
import { authenticate } from "./store/actions/auth";

import "./App.css";

class App extends React.Component {
  state = {
    showSideNav: false
  };

  componentDidMount = () => {
    console.log(store.getState().auth.userAuthenticated);
    store.dispatch(authenticate(store.getState().auth.userAuthenticated));
  };

  closeSideDrawer = () => {
    this.setState({ showSideNav: false });
  };

  showSideDrawer = () => {
    this.setState({ showSideNav: true });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar iconClicked={this.showSideDrawer} />
          <SideNav
            open={this.state.showSideNav}
            closed={this.closeSideDrawer}
          />
          <main style={{ marginTop: 70 }}>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/me" component={UserDashboard} />
              <Route path="/compDashboard" component={CompanyDashboard} />
              <Route path="/login" component={SignIn} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
