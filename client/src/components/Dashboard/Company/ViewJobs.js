import React from "react";

import classes from "./ViewJobs.module.css";

const ViewJobs = props => {
    return (
        <div className={classes.ViewJobs}>
            <h4 style={{ paddingLeft: 20 }}>Your Jobs</h4>
            {props.jobs.length > 0 ? (
                props.jobs.map((job, i) => (
                    <div className={classes.Job} key={job.id}>
                        <h4>{job.title}</h4>
                        <p>{job.primaryrole}</p>
                        <p>{job.typeofposition}</p>
                        <p>{job.city + ", " + job.state}</p>
                        <p>
                            <strong>
                                <u>Description</u>
                            </strong>
                        </p>
                        <pre className={classes.JobDescription}>
                            {job.description.slice(0, 200)}...
                        </pre>
                    </div>
                ))
            ) : (
                <p>You have no jobs posted</p>
            )}
        </div>
    );
};

export default ViewJobs;
