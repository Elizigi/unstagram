import express from "express";
import createPost from "../../controllers/posts/postCreate";
import userAuth from "../../controllers/users/userAuth";
import getAllPosts from "../../controllers/posts/postGetAll";
const router = express.Router();

router.get("/post-getall", getAllPosts);
router.post("/post-create", userAuth, createPost);
export default router;
