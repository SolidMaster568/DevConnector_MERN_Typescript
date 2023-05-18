import Router from "express";
import auth from "../middleware/auth";
import deleteAccount from "../controllers/users/deleteAccount";

const router = Router();

// @route    POST api/user/delete
// @access   Private
// @desc     cdelete account, profile and posts
router.delete("/delete", auth, deleteAccount);

export default router;
