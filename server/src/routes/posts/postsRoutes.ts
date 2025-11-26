import express from "express";
import userRegister from "../../controllers/users/userRegister";
import createPost from "../../controllers/posts/postCreate";
import userAuth from "../../controllers/users/userAuth";
const router = express.Router();

router.get("/post-getall", userRegister);
router.post("/post-create", userAuth, createPost);
export default router;
