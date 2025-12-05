import express from "express";
import createPost from "../../controllers/posts/postCreate";
import userAuth from "../../controllers/users/userAuth";
import getAllPosts from "../../controllers/posts/postGetAll";
import { optionalAuth } from "../../controllers/users/optionalAuth";
import changeLikeStatus from "../../controllers/posts/postLike";
import deletePost from "../../controllers/posts/deletePost";
import getFollowedPosts from "../../controllers/posts/getFollowedPosts";
const router = express.Router();

router.get("/post-getall", optionalAuth, getAllPosts);
router.post("/post-create", userAuth, createPost);
router.post("/post-like", userAuth, changeLikeStatus);
router.post("/post-delete", userAuth, deletePost);
router.get("/post-followed", optionalAuth, getFollowedPosts);

export default router;
