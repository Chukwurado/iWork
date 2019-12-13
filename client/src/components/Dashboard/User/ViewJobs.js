import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ViewJobs.module.css";
import googleLogo from "../../../../../client/src/google.jpg";
import VerticalModal from "./VerticalModal";
import FilterButtons from "./FilterButtons";

const ViewJobs = props => {
  const [jobs, setJobs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [jobIndex, setJobIndex] = useState();
  const [filteredJobs, setfilteredJobs] = useState();
  const [typeDropdownOpen, typeSetDropdownOpen] = useState(false);
  const [locationDropdownOpen, locationSetDropdownOpen] = useState(false);
  const [roleDropdownOpen, roleSetDropdownOpen] = useState(false);
  const typeToggle = () => typeSetDropdownOpen(prevState => !prevState);
  const locationToggle = () => locationSetDropdownOpen(prevState => !prevState);
  const roleToggle = () => roleSetDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const res = await axios.get("api/jobs");
      const jobs = res.data;

      setJobs(jobs);
      console.log(jobs);
    } catch (error) {
      console.log("error fetching jobs--", error);
    }
  };
  console.log(jobs);

  const filter = (type, value) => {
    console.log("#1--", jobs);
    const filtered = [];
    jobs.map(job => {
      console.log("#2--", job);
      if (job.typeofposition === "Full Time") {
        filtered.push(job);
      }
    });

    setJobs(filtered);
  };

  const showJob = index => {
    setJobIndex(index);
    setModalShow(true);
  };

  return (
    <div className={classes.ViewJobs}>
      <VerticalModal
        job={jobs[jobIndex]}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div style={{ flexDirection: "row" }}>
        <FilterButtons
          dropdownOpen={typeDropdownOpen}
          toggle={() => typeToggle()}
          filterType="Type"
          filterItems={["Internship", "Full Time", "Contractor"]}
        />
        <FilterButtons
          dropdownOpen={locationDropdownOpen}
          toggle={() => locationToggle()}
          filterType="Location"
          filterItems={["New York", "Los Angeles", "San Francisco"]}
        />
        <FilterButtons
          dropdownOpen={roleDropdownOpen}
          toggle={() => roleToggle()}
          filterType="Primary Role"
          filterItems={[
            "Software Engineer",
            "Software Developer",
            "Technology Analyst"
          ]}
        />
      </div>
      <div className="row ">
        {jobs.length > 0
          ? jobs.map((job, index) => (
              <div
                className="card"
                style={{
                  width: "15rem",
                  paddingRight: 10,
                  paddingLeft: 10,
                  margin: 10
                }}
              >
                <img
                  src={googleLogo}
                  className="card-img-top"
                  alt="..."
                  height="150"
                  width="150"
                />
                <div
                  style={{ padding: 0, paddingBottom: 10 }}
                  class="card-body"
                >
                  <h5 class="card-title">
                    <div>{job.title}</div>
                  </h5>
                  <p class="card-text">
                    <div>{job.typeofposition}</div>
                    <div>{job.primaryrole}</div>
                    <div>
                      {job.city} - {job.state}
                    </div>
                    <div style={{ fontStyle: "italic", fontSize: 12 }}>
                      {job.website}
                    </div>
                  </p>
                  <button
                    onClick={() => showJob(index)}
                    class="btn btn-primary"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ViewJobs;
