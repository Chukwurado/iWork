import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ViewJobs.module.css";

const ViewJobs = props => {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div className={classes.ViewJobs}>
      <div className="row justify-content-around">
        {jobs.length > 0
          ? jobs.map(job => (
              <div
                className="card"
                style={{ width: "15rem", padding: 20, margin: 20 }}
              >
                <img
                  src="https://picsum.photos/200/300"
                  className="card-img-top"
                  alt="..."
                  height="150"
                  width="150"
                />
                <div class="card-body">
                  <h5 class="card-title">
                    <div>{job.title}</div>
                  </h5>
                  <p class="card-text">
                    <div>{job.description}</div>
                    <div>{job.typeofposition}</div>
                    <div>{job.primaryrole}</div>
                    <div>
                      {job.city} {job.state}
                    </div>
                    <div>{job.website}</div>
                  </p>
                  <a href="#" class="btn btn-primary">
                    View More
                  </a>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

// {/* <div className="col-md-3 ">
// <div className={classes.Jobs}>
// <div className={classes.title}>{job.title}</div>
// <div className={classes.description}>{job.description}</div>
// <div className={classes.typeofposition}>
//   {job.typeofposition}
// </div>
// <div className={classes.primaryrole}>{job.primaryrole}</div>
// <div className={classes.city}>{job.city}</div>
// <div className={classes.state}>{job.state}</div>
// <div className={classes.website}>{job.website}</div>
// </div>
// </div> */}

export default ViewJobs;
