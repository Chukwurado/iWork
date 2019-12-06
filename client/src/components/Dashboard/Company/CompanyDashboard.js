import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

import ViewJobs from "./ViewJobs";
import EditCompanyinfo from "./EditCompanyInfo";
import PostJob from "./PostJob";
import SideBar from "./SideBar";

import classes from "./CompanyDashboard.module.css";

import companyTestPic from "../../../IMG_0583.JPG";

const CompanyDashboard = props => {
    const [editingProfile, setIsEditingProfile] = useState(false);
    const [showPostJob, setShowPostJob] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        industry: "",
        headquaters: "",
        type: "",
        website: "",
        yearFounded: "",
        companypicture: "",
        id: null
    });

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

    const { name, industry, yearFounded, headquaters, type, website } = profile;

    const showPostJobsHandler = () => {
        setShowPostJob(true);
    };

    return (
        <>
            <SideBar postjob={showPostJobsHandler} />
            <div className={classes.CompanyDashboard}>
                {showPostJob ? (
                    <PostJob />
                ) : (
                    <>
                        <div className={classes.ProfileCard}>
                            <div className={classes.ProfileDetailRow}>
                                <div
                                    className={classes.ProfilePic}
                                    style={{
                                        backgroundImage:
                                            "url(" + companyTestPic + ")"
                                    }}
                                >
                                    {/* <img src={companyTestPic} /> */}
                                </div>
                                <div className={classes.ProfileDetails}>
                                    <h4>
                                        {name} {}
                                    </h4>
                                    {industry && <p>{industry}</p>}
                                    <span>{headquaters && headquaters} </span>
                                    <span>{type && type}</span>
                                    <span>{website && website}</span>
                                </div>
                                <button className={classes.EditProfileBtn}>
                                    Edit Profile
                                </button>
                            </div>
                            <div className={classes.yearFounded}>
                                <h5>About Me</h5>
                                <p>
                                    {yearFounded
                                        ? yearFounded
                                        : "Write about company"}
                                </p>
                            </div>
                        </div>
                        <div className={classes.ProfileCard}>
                            <div className={classes.ProfileDetailRow}>
                                <div
                                    className={classes.ProfilePic}
                                    style={{
                                        backgroundImage:
                                            "url(" + companyTestPic + ")"
                                    }}
                                >
                                    {/* <img src={companyTestPic} /> */}
                                </div>
                                <div className={classes.ProfileDetails}>
                                    <h4>
                                        {name} {}
                                    </h4>
                                    {industry && <p>{industry}</p>}
                                    <span>{headquaters && headquaters} </span>
                                    <span>{type && type}</span>
                                    <span>{website && website}</span>
                                </div>
                                <button className={classes.EditProfileBtn}>
                                    Edit Profile
                                </button>
                            </div>
                            <div className={classes.yearFounded}>
                                <h5>About Me</h5>
                                <p>
                                    {yearFounded
                                        ? yearFounded
                                        : "Write about company"}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CompanyDashboard;
