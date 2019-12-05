import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";

import Modal from "../UI/Modal";
import EditProfile from "./EditProfile";
import AddExperince from "./AddExperience";
import EditExperience from "./EditExperience";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";

import classes from "./UserDashboard.module.css";

import testpic from "../../_DSC3181.jpg";

const UserDashboard = props => {
    const [addingExp, setIsAddingExp] = useState(false);
    const [addingEdu, setIsAddingEdu] = useState(false);
    const [editingExp, setEditingExp] = useState(false);
    const [editingEdu, setEditingEdu] = useState(false);
    const [editingIdx, setEditingIdx] = useState();
    const [editingProfile, setIsEditingProfile] = useState(false);
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
                education: education.sort((a, b) => a.id - b.id),
                experiences: experiences.sort((a, b) => a.id - b.id)
            });
        } catch (err) {
            console.log(err.response.data.errors);
        }
    };

    useEffect(() => {
        getCurrentProfile();
    }, []);

    if (!props.userAuthenticated) {
        return <Redirect to="/login"></Redirect>;
    }

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

    const editEduHandler = idx => {
        setEditingIdx(idx);
        setEditingEdu(true);
    };

    const closeModal = () => {
        setIsAddingExp(false);
        setIsEditingProfile(false);
        setIsAddingEdu(false);
        setEditingExp(false);
        setEditingEdu(false);
        getCurrentProfile();
    };

    const deleteExpHandler = async id => {
        try {
            const res = await axios.delete(`/api/experience/${id}`);
            console.log(res.data);
            getCurrentProfile();
        } catch (err) {
            console.log(err.response.body);
        }
    };

    const deleteEduHandler = async id => {
        try {
            const res = await axios.delete(`/api/education/${id}`);
            console.log(res.data);
            getCurrentProfile();
        } catch (err) {
            console.log(err.response.body);
        }
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
                    <AddEducation closeModal={closeModal} />
                ) : editingExp ? (
                    <EditExperience
                        closeModal={closeModal}
                        experience={experiences[editingIdx]}
                    />
                ) : editingEdu ? (
                    <EditEducation
                        closeModal={closeModal}
                        education={education[editingIdx]}
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
                                <button
                                    className={classes.DeleteBtn}
                                    onClick={() => deleteExpHandler(exp.id)}
                                >
                                    Delete
                                </button>
                                <div className={classes.ExpImage}></div>
                                <div className={classes.Exp}>
                                    <h6>{exp.company}</h6>
                                    <h5>{exp.title}</h5>
                                    <p>
                                        <Moment format="MM/YYYY">
                                            {exp.from}
                                        </Moment>{" "}
                                        -{" "}
                                        {!exp.to ? (
                                            "Present"
                                        ) : (
                                            <Moment format="MM/YYYY">
                                                {exp.to}
                                            </Moment>
                                        )}
                                    </p>
                                    <p>{exp.location && exp.location}</p>
                                    <pre className={classes.JobDescription}>
                                        {exp.description && exp.description}
                                    </pre>
                                </div>
                                {i < experiences.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.ProfileCard}>
                    <div className={classes.EduHeader}>
                        <h5>Education</h5>
                        <button
                            className={classes.AddEduBtn}
                            onClick={addEduHandler}
                        >
                            Add Education
                        </button>
                    </div>
                    <div className={classes.EduDetails}>
                        {education.map((edu, i) => (
                            <div key={edu.id}>
                                <button
                                    className={classes.EditButton}
                                    onClick={() => editEduHandler(i)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={classes.DeleteBtn}
                                    onClick={() => deleteEduHandler(edu.id)}
                                >
                                    Delete
                                </button>
                                <div className={classes.Edu}>
                                    <h6>{edu.school}</h6>
                                    <p>
                                        <Moment format="MM/YYYY">
                                            {edu.from}
                                        </Moment>{" "}
                                        -{" "}
                                        {!edu.to ? (
                                            "Present"
                                        ) : (
                                            <Moment format="MM/YYYY">
                                                {edu.to}
                                            </Moment>
                                        )}
                                    </p>
                                    <p>{edu.fieldofstudy}</p>
                                    <p>{edu.degree}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    userAuthenticated: state.auth.userAuthenticated
});

export default connect(mapStateToProps)(UserDashboard);
