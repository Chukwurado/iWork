import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navigation/Navbar";
import SideNav from "./components/Navigation/SideNav";
import Register from "./components/Auth/Register";
import SignIn from "./components/Auth/SignIn";
import UserDashboard from "./components/Dashboard/User/UserDashboard";
import CompanyDashboard from "./components/Dashboard/Company/CompanyDashboard";
import ViewJobs from "./components/Dashboard/User/ViewJobs";

import store from "./store";
import { authenticate, setAuthToken } from "./store/actions/auth";

import "./App.css";

setAuthToken(localStorage.token);

class App extends React.Component {
    state = {
        showSideNav: false
    };

    refreshPage = () => {
        window.location.reload(false);
    };

    componentDidMount = () => {
        store.dispatch(authenticate(store.getState().auth.userAuthenticated));
    };

    closeSideDrawer = () => {
        this.setState({ showSideNav: false });
    };

    showSideDrawer = () => {
        this.setState({ showSideNav: true });
    };

    render() {
        const {
            userAuthenticated,
            companyAuthenticated
        } = store.getState().auth;
        return (
            <Provider store={store}>
                <Router>
                    <Navbar iconClicked={this.showSideDrawer} />
                    <SideNav
                        open={this.state.showSideNav}
                        closed={this.closeSideDrawer}
                    />
                    <main
                        style={{
                            marginTop:
                                userAuthenticated || companyAuthenticated
                                    ? 80
                                    : 0
                        }}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={SignIn} />
                            <Route exact path="/me" component={UserDashboard} />
                            <Route exact path="/jobs" component={ViewJobs} />
                            <Route
                                exact
                                path="/dashboard"
                                component={CompanyDashboard}
                            />
                            <Route exact path="/" component={Landing} />
                        </Switch>
                    </main>
                </Router>
            </Provider>
        );
    }
}

export default App;
