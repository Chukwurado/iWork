import React, { Component } from "react";

import AddEducation from "../components/AddEducation";

class AddEducationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        school: "",
        degree: "",
        fieldOfStudy: "",
        fromDate: "",
        toDate: ""
      }
    };
  }

  render() {
    //   const {school, degree, fieldOfStudy, fromDate, toDate} = this.state;
    return (
      <AddEducation
      // school={school}
      // degree={degree}
      // fieldOfStudy={fieldOfStudy}
      // fromDate={fromDate}
      // toDate={toDate}
      />
    );
  }
}

export default AddEducationPage;
