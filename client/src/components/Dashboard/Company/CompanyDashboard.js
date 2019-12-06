import React, { useEffect, useState } from "react";
import axios from "axios";

import ViewJobs from "./ViewJobs";
import EditCompanyinfo from "./EditCompanyInfo";
import PostJob from "./PostJob";
import SideBar from "./SideBar";

import classes from "./CompanyDashboard.module.css";

const CompanyDashboard = props => {
    const [showPostJob, setShowPostJob] = useState(false);

    useEffect(() => {
        getCurrentProfile();
    }, []);

    const getCurrentProfile = async () => {
        try {
            const res = await axios.get("api/profile/company/dashboard");
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const showPostJobsHandler = () => {
        setShowPostJob(true);
    };

    const showViewJobs = () => {
        setShowPostJob(false);
    };

    return (
        <>
            <SideBar postjob={showPostJobsHandler} viewjobs={showViewJobs} />
            <div className={classes.CompanyDashboard}>
                {showPostJob ? <PostJob /> : <ViewJobs />}
            </div>
        </>
    );
};

export default CompanyDashboard;
