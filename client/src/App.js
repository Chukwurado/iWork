import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import Navigation from "./components/Navigation";

import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";

import PostJobsPage from "./pages/PostJobsPage";
import AddEducationPage from "./pages/AddEducationPage";
import CompanyProfile from "./pages/CompanyProfile";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Router>
          <Navigation />
        </Router> */}
        <CompanyProfile />
      </div>
      // <Router>
      //   <Navigation />
      //   <div className="container-fluid text-center">
      //     <div className="row justify-content-center">
      //       <Switch>
      //         <Route path="/posts/new" component={PostFormPage} />
      //         <Route path="/posts/:id" component={ShowPostPage} />
      //         <Route path="/about-us" component={AboutUsPage} />
      //         <Route path="/" component={PostsListPage} />
      //       </Switch>
      //     </div>
      //   </div>
      // </Router>
    );
  }
}

export default App;
