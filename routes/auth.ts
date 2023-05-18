import { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/auth";
import authUser from "../controllers/authentication/authUser";
import login from "../controllers/authentication/login";
import signup from "../controllers/authentication/signup";

const router = Router();

// @route    GET api/auth
// @access   Public
// @desc     receive a user object if a jwt exists
router.get("/", auth, authUser);

// @route    POST api/auth/signup
// @access   Public
// @desc     signup users
router.post(
  "/signup",
  [
    check("name", "please provide a name").notEmpty(),
    check("email", "please provide a valid email").isEmail(),
    check("password", "password must be between 6 an 18 characters").isLength({
      min: 6,
      max: 18,
    }),
  ],
  signup
);

// @route    POST api/auth/login
// @access   Public
// @desc     login
router.post(
  "/login",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "please enter your password").exists({
      checkFalsy: true,
      checkNull: true,
    }),
  ],
  login
);

export default router;
