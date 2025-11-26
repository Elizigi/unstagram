import express from "express";
import userRegister from "../../controllers/users/userRegister";
import userLogin from "../../controllers/users/userLogin";
const router = express.Router();

router.get("/post-getall", userRegister);
router.post("/post-create", userLogin);
export default router;
