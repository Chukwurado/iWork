const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../models");
const auth = require("../middleware/auth");
const {
  Company,
  User,
  Companyprofile,
  Userprofile,
  Education,
  Experience
} = db;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //1st parameter is error
    //2nd parameter is the location the image will be sent to
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    //1st parameter is error
    //2nd parameter is the name used to save file
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

//@route    POST api/profile/user
//@desc     Create or Update profile
//@access   PRIVATE
router.post("/user", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const { id } = req.user;
    const {
      bio,
      title,
      linkedIn,
      github,
      website,
      firstName,
      lastName
    } = req.body;

    let profile = await Userprofile.findOne({
      where: { userId: id }
    });

    const profileFields = {};

    profileFields.userId = req.user.id;
    if (bio) profileFields.bio = bio;
    if (title) profileFields.title = title;
    if (linkedIn) profileFields.linkedIn = linkedIn;
    if (github) profileFields.github = github;
    if (website) profileFields.website = website;

    if (!profile) {
      await Userprofile.create(profileFields);
    } else {
      await profile.update(profileFields);
    }

    const userFields = { firstName, lastName };
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [
        { model: Userprofile },
        { model: Education },
        { model: Experience }
      ]
    });

    await user.update(userFields);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//@route    POST api/profile/company
//@desc     Create or Update Company Profile
//@access   Private
router.post("/company", auth, async (req, res) => {
  if (!req.company) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const { id } = req.company;
    const { overview, website, industry, yearFounded, headquaters } = req.body;

    let profile = await Companyprofile.findOne({
      where: { companyId: id }
    });

    const profileFields = {};

    profileFields.companyId = req.company.id;
    if (overview) profileFields.overview = overview;
    if (website) profileFields.website = website;
    if (industry) profileFields.industry = industry;
    if (yearFounded) profileFields.yearFounded = yearFounded;
    if (headquaters) profileFields.headquaters = headquaters;

    if (!profile) {
      profile = await Companyprofile.create(profileFields);
    } else {
      await profile.update(profileFields);
    }

    const companyFields = { name };

    const company = await Company.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
        include: [{ model: Companyprofile, as: "profile" }]
      }
    });

    company.update(companyFields);
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route    GET api/profile/user/:id
//@desc     Get user profile
//@access   PRIVATE
router.get("/user/:id", auth, async (req, res) => {
  try {
    //Extracts the profile ID
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [
        { model: Userprofile },
        { model: Education },
        { model: Experience }
      ]
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route    GET api/profile/company/:id
//@desc     Get company profile
//@access   PRIVATE
router.get("/company/:id", auth, async (req, res) => {
  try {
    //Extracts the profile ID
    const { id } = req.params;
    const profile = await Companyprofile.findOne({
      where: { id },
      include: {
        model: Company,
        attributes: { exclude: ["password", "email"] }
      }
    });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route    PUT api/profile/user/profilepic
//@desc     Upload Profile Picture
//@access   PRIVATE
router.put(
  "/user/profilepic",
  [auth, upload.single("profilePic")],
  async (req, res) => {
    try {
      const { id } = req.user;
      const profile = await Userprofile.findOne({ where: { userId: id } });
      if (!profile) {
        await Userprofile.create({ profilepicture: req.file.path, userId: id });
      } else {
        //If user has a profile pic, delete it
        if (profile.dataValues.profilepicture) {
          fs.unlink("./" + profile.dataValues.profilepicture, err => {
            if (err) {
              console.error(err);
            } else {
              console.log("File Deleted");
            }
          });
        }
        await profile.update({ profilepicture: req.file.path });
      }
      res.json({ success: true, profilepicture: req.file.path });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/profile/company/profilepic
//@desc     Upload Profile Picture
//@access   PRIVATE
router.put(
  "/company/profilepic",
  [auth, upload.single("profilePic")],
  async (req, res) => {
    console.log(req.file);

    try {
      const { id } = req.user;
      const profile = await Companyprofile.findOne({
        where: { companyId: id }
      });
      if (!profile) {
        await Companyprofile.create({
          profilepicture: req.file.path,
          companyId: id
        });
      } else {
        //If company has a profile pic, delete it
        if (profile.dataValues.profilepicture) {
          fs.unlink("./" + profile.dataValues.profilepicture, err => {
            if (err) {
              console.error(err);
            } else {
              console.log("File Deleted");
            }
          });
        }
        await profile.update({ profilepicture: req.file.path });
      }
      res.json({ success: true, profilepicture: req.file.path });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE api/profile/user/profilepic
//@desc     Delete Profile Picture
//@access   PRIVATE
router.delete("/user/profilepic", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const profile = await Userprofile.findOne({ where: { userId: id } });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    fs.unlink("./" + profile.dataValues.profilepicture, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Deleted");
      }
    });
    profile.update({ profilepicture: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/profile/company/profilepic
//@desc     Delete Profile Picture
//@access   PRIVATE
router.delete("/company/profilepic", auth, async (req, res) => {
  try {
    const { id } = req.company;
    const profile = await Companyprofile.findOne({ where: { companyId: id } });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    fs.unlink("./" + profile.dataValues.profilepicture, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Deleted");
      }
    });
    profile.update({ profilepicture: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
