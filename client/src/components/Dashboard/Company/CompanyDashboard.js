import React, { useEffect, useState } from "react";
import axios from "axios";

import ViewJobs from "./ViewJobs";
import EditCompanyinfo from "./EditCompanyInfo";
import PostJob from "./PostJob";
import SideBar from "./SideBar";

import classes from "./CompanyDashboard.module.css";
import { setAuthToken } from "../../../store/actions/auth";

const CompanyDashboard = props => {
  const [showPostJob, setShowPostJob] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    id: null,
    jobs: []
  });

  const getCompanyInfo = async () => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.get("api/profile/company/dashboard");
      console.log(res.data);
      setCompanyInfo({
        ...companyInfo,
        id: res.data.id,
        jobs: res.data.jobs,
        name: res.data.name
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const { jobs } = companyInfo;

  const showPostJobsHandler = () => {
    setShowPostJob(true);
  };

  const showViewJobs = () => {
    getCompanyInfo();
    setShowPostJob(false);
  };

  return (
    <>
      <SideBar postjob={showPostJobsHandler} viewjobs={showViewJobs} />
      <div className={classes.CompanyDashboard}>
        {showPostJob ? (
          <PostJob
            showViewJobs={showViewJobs}
            getCompanyInfo={getCompanyInfo}
          />
        ) : (
          <ViewJobs jobs={jobs} />
        )}
      </div>
    </>
  );
};

export default CompanyDashboard;
