import { Router } from "express";
import auth from "../middleware/auth";
import { check } from "express-validator";

import createPost from "../controllers/posts/createPost";
import getPost from "../controllers/posts/getPost";
import getAllPosts from "../controllers/posts/getAllPosts";
import deletePost from "../controllers/posts/deletePost";
import likeOrUnlikePost from "../controllers/posts/likeOrUnlikePost";
import createComment from "../controllers/posts/createComment";
import deleteComment from "../controllers/posts/deleteComment";

const router = Router();

// @route    POST api/post/create
// @access   Private
// @desc     create post
router.post(
  "/create",
  auth,
  [check("content", "post is empty").notEmpty({ ignore_whitespace: true })],
  createPost
);

// @route    GET api/post/all
// @access   Private
// @desc     get all posts
router.get("/all", auth, getAllPosts);

// @route    GET api/post/:id
// @access   Private
// @desc     get a post
router.get("/:id", auth, getPost);

// @route    DELETE api/post/delete/:id
// @access   Private
// @desc     delete a post
router.delete("/delete/:id", auth, deletePost);

// @route    PUT api/post/like/:id
// @access   Private
// @desc     like or unlike a post
router.put("/like/:id", auth, likeOrUnlikePost);

// @route    PUT api/post/comment/:postId
// @access   Private
// @desc     comment on a post
router.put(
  "/comment/:postId",
  auth,
  [check("content", "comment is empty").notEmpty({ ignore_whitespace: true })],
  createComment
);

// @route    DELETE api/post/comment/:postId/:commentId
// @access   Private
// @desc     delete a comment
router.delete("/deleteComment/:postId/:commentId", auth, deleteComment);

export default router;
