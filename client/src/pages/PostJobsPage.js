import React, { Component } from "react";

import PostJobs from "../components/PostJobs";
import "../styles/PostJobs.css";

class PostJobsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: {
        title: "",
        description: "",
        typeofposition: "",
        primaryrole: "",
        state: "",
        city: "",
        state: "",
        website: ""
      }
    };
  }

  selectState = val => {
    this.setState({ state: val.target.value });
  };

  selectCity = val => {
    this.setState({ city: val.target.value });
  };

  render() {
    const { city, state } = this.state;
    return (
      <PostJobs
        state={state}
        city={city}
        selectState={val => this.selectState(val)}
        selectCity={val => this.selectCity(val)}
      />
    );
  }
}

export default PostJobsPage;
