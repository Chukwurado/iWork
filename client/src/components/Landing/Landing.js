import React from "react";

import classes from "./Landing.module.css";
import image from "./illuminated_city.jpg";

const Landing = () => {
    return (
        <div>
            <section className={classes.Landing}>
                <div className={classes.Overlay}>
                    <div className={classes.WelcomeBox}>
                        <div className={classes.Welcome}>
                            <h1>Welcome to iWork</h1>
                        </div>
                    </div>
                </div>
                <div className={classes.Landing_Image} />
            </section>
            <div className={classes.Content}>
                <h1 className={classes.ContentHeader}>About iWork</h1>
                <hr />
                <div className={classes.ContentPitch}>
                    <p>
                        iWork is an application that allows international
                        students to find jobs that are guaranteed to sponsor
                        international students. The reason why we decided to
                        build this project was that we realized that is
                        difficult for international students to find jobs. What
                        a lot of people don’t realize is that so many companies
                        use an automated system to filter out applicants who
                        select yes to every international student’s worst
                        question, which is “Would you now or in the future
                        require sponsorship”. Not only do we have to deal with
                        the headache of job hunting, but we also have to cross
                        our fingers and pray that our application even gets
                        looked at.
                    </p>
                    <p>
                        iWork would mean so much to international students
                        because it would alleviate most of the stress, we as
                        international students face when applying for jobs. It
                        gives us great pride to make an application that could
                        impact the lives of about 1 million international
                        students in the US, and hopefully lead to a student
                        finding his/her dream job.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
