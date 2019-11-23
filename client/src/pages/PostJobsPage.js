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
        country: "",
        city: "",
        state: "",
        website: ""
      }
    };
  }

  selectCountry = val => {
    this.setState({ country: val });
  };

  selectCity = val => {
    const selectedCity = val.target.value;
    this.setState({ city: selectedCity });
  };

  render() {
    const { city } = this.state;
    return <PostJobs city={city} selectCity={val => this.selectCity(val)} />;
  }
}

export default PostJobsPage;
