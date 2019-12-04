import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";

import Modal from "../UI/Modal";
import EditProfile from "./EditProfile";
import AddExperince from "./AddExperience";
import EditExperience from "./EditExperience";

import classes from "./UserDashboard.module.css";

import testpic from "../../_DSC3181.jpg";

const UserDashboard = () => {
    const [addingExp, setIsAddingExp] = useState(false);
    const [editingExp, setEditingExp] = useState(false);
    const [editingEdu, setEditingEdu] = useState(false);
    const [editingIdx, setEditingIdx] = useState();
    const [editingProfile, setIsEditingProfile] = useState(false);
    const [addingEdu, setIsAddingEdu] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        title: "",
        linkedIn: "",
        github: "",
        website: "",
        bio: "",
        experiences: [],
        education: [],
        id: null
    });

    useEffect(() => {
        getCurrentProfile();
    }, []);

    const getCurrentProfile = async () => {
        try {
            const res = await axios.get("api/profile/me");
            console.log(res.data);
            const {
                firstName,
                lastName,
                userprofile,
                education,
                experiences
            } = res.data;
            setProfile({
                firstName: firstName,
                lastName: lastName,
                title: !userprofile ? "" : userprofile.title,
                bio: !userprofile ? "" : userprofile.bio,
                linkedIn: !userprofile ? "" : userprofile.linkedIn,
                github: !userprofile ? "" : userprofile.github,
                website: !userprofile ? "" : userprofile.website,
                education,
                experiences
            });
        } catch (err) {
            console.log(err.response.data.errors);
        }
    };

    const {
        firstName,
        lastName,
        title,
        bio,
        linkedIn,
        github,
        website,
        education,
        experiences
    } = profile;

    const addExpHandler = () => {
        setIsAddingExp(true);
    };

    const addEduHandler = () => {
        setIsAddingEdu(true);
    };

    const editProfileHandler = () => {
        setIsEditingProfile(true);
    };

    const editExpHandler = idx => {
        setEditingExp(true);
        setEditingIdx(idx);
    };

    const closeModal = () => {
        setIsAddingExp(false);
        setIsEditingProfile(false);
        setIsAddingEdu(false);
        setEditingExp(false);
        getCurrentProfile();
    };
    return (
        <>
            <Modal
                show={
                    addingExp ||
                    addingEdu ||
                    editingProfile ||
                    editingExp ||
                    editingEdu
                }
                closeModal={closeModal}
            >
                {addingExp ? (
                    <AddExperince closeModal={closeModal} />
                ) : editingProfile ? (
                    <EditProfile
                        firstName={firstName}
                        lastName={lastName}
                        bio={bio}
                        linkedIn={linkedIn}
                        github={github}
                        website={website}
                        title={title}
                        closeModal={closeModal}
                    />
                ) : addingEdu ? (
                    "Adding Education"
                ) : editingExp ? (
                    <EditExperience
                        closeModal={closeModal}
                        experience={experiences[editingIdx]}
                    />
                ) : null}
            </Modal>
            <div className={classes.UserDashboard}>
                <div className={classes.ProfileCard}>
                    <div className={classes.ProfileDetailRow}>
                        <div
                            className={classes.ProfilePic}
                            style={{ backgroundImage: "url(" + testpic + ")" }}
                        >
                            {/* <img src={testpic} /> */}
                        </div>
                        <div className={classes.ProfileDetails}>
                            <h4>
                                {firstName} {lastName}
                            </h4>
                            {title && <p>{title}</p>}
                            <span>{linkedIn && linkedIn} </span>
                            <span>{github && github}</span>
                            <span>{website && website}</span>
                        </div>
                        <button
                            className={classes.EditProfileBtn}
                            onClick={editProfileHandler}
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className={classes.Bio}>
                        <h5>About Me</h5>
                        <p>{bio ? bio : "Talk about yourself"}</p>
                    </div>
                </div>
                <div className={classes.ProfileCard}>
                    <div className={classes.ExpHeader}>
                        <h5>Experience</h5>
                        <button
                            className={classes.AddExpBtn}
                            onClick={addExpHandler}
                        >
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
                                    <h5>{exp.title}</h5>
                                    <p>
                                        <Moment format="YYYY/MM">
                                            {exp.from}
                                        </Moment>{" "}
                                        -{" "}
                                        {!exp.to ? (
                                            "Present"
                                        ) : (
                                            <Moment format="YYYY/MM">
                                                {exp.to}
                                            </Moment>
                                        )}
                                    </p>
                                    <p>{exp.location && exp.location}</p>
                                    <p>{exp.description && exp.description}</p>
                                </div>
                                {i < experiences.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.ProfileCard}>
                    <div className={classes.EduHeader}>
                        <h5>Education</h5>
                        <button className={classes.AddEduBtn}>
                            Add Education
                        </button>
                    </div>
                    <div className={classes.EduDetails}>
                        {education.map((edu, i) => (
                            <>
                                <button
                                    className={classes.EditButton}
                                    onClick={addEduHandler}
                                >
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
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
