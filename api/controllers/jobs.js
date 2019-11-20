const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
const { Company, User, Companyprofile, Userprofile, Job } = db;

//@route    POST api/jobs
//@desc     Post job
//@access   PRIVATE
router.post(
  "/",
  [
    auth,
    check("title", "Job title is required")
      .not()
      .isEmpty(),
    check("description", "Description is required")
      .not()
      .isEmpty(),
    check("typeofposition", "Type of position is required")
      .not()
      .isEmpty(),
    check("primaryrole", "Primary role is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //Users are not allowed to post jobs
    if (req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.company;
      const {
        title,
        description,
        typeofposition,
        primaryrole,
        city,
        state,
        website
      } = req.body;

      const jobDetails = {
        title,
        description,
        typeofposition,
        primaryrole
      };
      jobDetails.companyId = id;
      if (city) jobDetails.city = city;
      if (state) jobDetails.state = state;
      if (website) jobDetails.website = website;

      await Job.create(jobDetails);

      res.json({ msg: "Job Posted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "server error" });
    }
  }
);

//@route    PUT api/job
//@desc     Update job
//@access   PRIVATE
router.post(
  "/:job_id",
  [
    auth,
    check("title", "Job title is required")
      .not()
      .isEmpty(),
    check("description", "Description is required")
      .not()
      .isEmpty(),
    check("typeofposition", "Type of position is required")
      .not()
      .isEmpty(),
    check("primaryrole", "Primary role is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //Users are not allowed to post jobs
    if (req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
      const { id } = req.company;
      const { job_id } = req.params;
      const {
        title,
        description,
        typeofposition,
        primaryrole,
        city,
        state,
        website
      } = req.body;

      const jobDetails = {
        title,
        description,
        typeofposition,
        primaryrole
      };
      jobDetails.companyId = id;
      if (city) jobDetails.city = city;
      if (state) jobDetails.state = state;
      if (website) jobDetails.website = website;

      const job = await Job.findByPk(job_id);
      await job.update(jobDetails);

      res.json({ msg: "Job Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "server error" });
    }
  }
);

//@route    GET api/jobs
//@desc     Get all jobs
//@access   PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: Company,
          attributes: ["id", "name"],
          include: [
            {
              model: Companyprofile,
              attributes: ["companypicture"]
            }
          ]
        }
      ]
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
