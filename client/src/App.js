import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";
import SideNav from "./components/Navigation/SideNav";
import Register from "./components/Auth/Register";

import "./App.css";

class App extends React.Component {
    state = {
        showSideNav: false
    };

    closeSideDrawer = () => {
        this.setState({ showSideNav: false });
    };

    showSideDrawer = () => {
        this.setState({ showSideNav: true });
    };

    render() {
        return (
            <Router>
                <Navbar iconClicked={this.showSideDrawer} />
                <SideNav
                    open={this.state.showSideNav}
                    closed={this.closeSideDrawer}
                />
                <main style={{ marginTop: 70 }}>
                    <Switch>
                        <Route path="/register" component={Register} />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;
