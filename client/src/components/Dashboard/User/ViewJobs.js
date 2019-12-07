import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return <div> test {jobs.length > 0 ? jobs[0].title : null}</div>;
};

export default ViewJobs;
