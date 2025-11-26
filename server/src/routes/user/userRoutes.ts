import express from "express";
import userRegister from "../../controllers/users/userRegister";
import userLogin from "../../controllers/users/userLogin";
const router = express.Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);

export default router;
