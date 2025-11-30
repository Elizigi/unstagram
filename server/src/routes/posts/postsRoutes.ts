import express from "express";
import createPost from "../../controllers/posts/postCreate";
import userAuth from "../../controllers/users/userAuth";
import getAllPosts from "../../controllers/posts/postGetAll";
import { optionalAuth } from "../../controllers/users/optionalAuth";
import changeLikeStatus from "../../controllers/posts/postLike";
import deletePost from "../../controllers/posts/deletePost";
const router = express.Router();

router.get("/post-getall", optionalAuth, getAllPosts);
router.post("/post-create", userAuth, createPost);
router.post("/post-like", userAuth, changeLikeStatus);
router.post("/post-delete", userAuth, deletePost);

export default router;
