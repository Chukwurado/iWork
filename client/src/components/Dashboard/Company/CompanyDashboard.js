import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";

import Modal from "../../UI/Modal";
import EditCompanyInfo from "./EditCompanyInfo";
// import AddExperince from "./AddExperience";
// import EditExperience from "./EditExperience";

import classes from "./CompanyDashboard.module.css";

import companyTestPic from "../../../IMG_0583.JPG";

const UserDashboard = () => {
    const [addingExp, setIsAddingExp] = useState(false);
    const [editingExp, setEditingExp] = useState(false);
    const [editingEdu, setEditingEdu] = useState(false);
    const [editingIdx, setEditingIdx] = useState();
    const [editingProfile, setIsEditingProfile] = useState(false);
    const [addingEdu, setIsAddingEdu] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        industry: "",
        headquaters: "",
        type: "",
        website: "",
        yearFounded: "",
        companypicture: "",
        // experiences: [],
        // education: [],
        id: null
    });

    useEffect(() => {
        getCurrentProfile();
    }, []);

    const getCurrentProfile = async () => {
        try {
            const res = await axios.get("api/profile/me");
            console.log(res.data);
            const { name, userprofile, education, experiences } = res.data;
            setProfile({
                name: name,
                industry: !userprofile ? "" : userprofile.industry,
                yearFounded: !userprofile ? "" : userprofile.yearFounded,
                headquaters: !userprofile ? "" : userprofile.headquaters,
                type: !userprofile ? "" : userprofile.type,
                website: !userprofile ? "" : userprofile.website
                // education,
                // experiences
            });
        } catch (err) {
            console.log(err.response.data.errors);
        }
    };

    const {
        name,
        industry,
        yearFounded,
        headquaters,
        type,
        website
        // education,
        // experiences
    } = profile;

    //   const addExpHandler = () => {
    //     setIsAddingExp(true);
    //   };

    //   const addEduHandler = () => {
    //     setIsAddingEdu(true);
    //   };

    const editProfileHandler = () => {
        setIsEditingProfile(true);
    };

    //   const editExpHandler = idx => {
    //     setEditingExp(true);
    //     setEditingIdx(idx);
    //   };

    const closeModal = () => {
        // setIsAddingExp(false);
        setIsEditingProfile(false);
        // setIsAddingEdu(false);
        // setEditingExp(false);
        getCurrentProfile();
    };
    return (
        <>
            <Modal
                show={
                    editingProfile
                    //   addingExp || addingEdu || editingProfile || editingExp || editingEdu
                }
                closeModal={closeModal}
            >
                {/* {addingExp ? (
          <AddExperince closeModal={closeModal} />
        ) :  */}
                {editingProfile ? (
                    <EditCompanyInfo
                        name={name}
                        yearFounded={yearFounded}
                        headquaters={headquaters}
                        type={type}
                        website={website}
                        industry={industry}
                        closeModal={closeModal}
                    />
                ) : // {/* : addingEdu ? (
                //   "Adding Education"
                // )  */}
                // {/* : editingExp ? (
                //   <EditExperience
                //     closeModal={closeModal}
                //     experience={experiences[editingIdx]}
                //   />
                // )  */}
                null}
            </Modal>
            <div className={classes.UserDashboard}>
                <div className={classes.ProfileCard}>
                    <div className={classes.ProfileDetailRow}>
                        <div
                            className={classes.ProfilePic}
                            style={{
                                backgroundImage: "url(" + companyTestPic + ")"
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
                        <button
                            className={classes.EditProfileBtn}
                            onClick={editProfileHandler}
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className={classes.yearFounded}>
                        <h5>About Me</h5>
                        <p>
                            {yearFounded ? yearFounded : "Write about company"}
                        </p>
                    </div>
                </div>
                {/* <div className={classes.ProfileCard}>
          <div className={classes.ExpHeader}>
            <h5>Experience</h5>
            <button className={classes.AddExpBtn} onClick={addExpHandler}>
              Add Experience
            </button>
          </div>
          <div className={classes.ExpDetails}>
            {experiences.map((exp, i) => (
              <div key={exp.id}>
                <button
                  className={classes.EditButton}
                  onClick={() => editExpHandler(i)}
                >
                  Edit
                </button>
                <div className={classes.ExpImage}></div>
                <div className={classes.Exp}>
                  <h6>{exp.company}</h6>
                  <h5>{exp.industry}</h5>
                  <p>
                    <Moment format="YYYY/MM">{exp.from}</Moment> -{" "}
                    {!exp.to ? (
                      "Present"
                    ) : (
                      <Moment format="YYYY/MM">{exp.to}</Moment>
                    )}
                  </p>
                  <p>{exp.location && exp.location}</p>
                  <p>{exp.description && exp.description}</p>
                </div>
                {i < experiences.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div> */}
                {/* <div className={classes.ProfileCard}>
          <div className={classes.EduHeader}>
            <h5>Education</h5>
            <button className={classes.AddEduBtn}>Add Education</button>
          </div>
          <div className={classes.EduDetails}>
            {education.map((edu, i) => (
              <>
                <button className={classes.EditButton} onClick={addEduHandler}>
                  Edit
                </button>
                <div className={classes.Edu}>
                  <h6>Name of School</h6>
                  <p>From - to</p>
                  <p>Location</p>
                </div>
              </>
            ))}
          </div>
        </div> */}
            </div>
        </>
    );
};

export default UserDashboard;
