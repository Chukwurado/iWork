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

class App extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
            </Router>
        );
    }
}

export default App;
