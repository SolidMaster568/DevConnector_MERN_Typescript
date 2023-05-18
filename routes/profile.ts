import { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/auth";
import getCurrentUserProfile from "../controllers/profiles/getCurrentUserProfile";
import getAllProfiles from "../controllers/profiles/getAllProfiles";
import getUserProfile from "../controllers/profiles/getUserProfile";
import postProfile from "../controllers/profiles/postProfile";
import getGithubRepos from "../controllers/profiles/getGithubRepos";

const router = Router();

// @route    GET api/profile/me
// @access   Private
// @desc     get current user profile
router.get("/me", auth, getCurrentUserProfile);

// @route    GET api/profile/all
// @access   Private
// @desc     get all user profiles
router.get("/all", getAllProfiles);

// @route    GET api/profile/:userId
// @access   Private
// @desc     get all user profiles
router.get("/:userId", getUserProfile);

// @route    POST api/profile
// @access   Private
// @desc     create or update user profile
router.post(
  "/",
  auth,
  [
    check("skills", "skills field/s is required").notEmpty(),
    check("experience", "experience field/s is required").notEmpty(),
    check("education", "education field/s is required").notEmpty(),
    check("status", "status field is required").notEmpty(),
  ],
  postProfile
);

// @route    GET api/profile/github/:username
// @access   Private
// @desc     get users github repos
router.get("/github/:username", getGithubRepos);

export default router;
