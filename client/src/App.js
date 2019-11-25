import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";

import "./App.css";
import SideNav from "./components/Navigation/SideNav";

class App extends React.Component {
    state = {
        showSideNav: false
    };

    closeSideDrawer = () => {
        this.setState({ showSideNav: false });
    };

    showSideNavToggle = () => {
        this.setState({ showSideNav: !this.state.showSideNav });
    };

    render() {
        return (
            <Router>
                <Navbar iconClicked={this.showSideNavToggle} />
                <SideNav
                    open={this.state.showSideNav}
                    closed={this.closeSideDrawer}
                />
            </Router>
        );
    }
}

export default App;
