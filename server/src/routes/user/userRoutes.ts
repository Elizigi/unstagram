import express from "express";
import userRegister from "../../controllers/users/userRegister";
import userLogin from "../../controllers/users/userLogin";
import userLogged from "../../controllers/users/userLogged";
import logOut from "../../controllers/users/logOut";
import userAuth from "../../controllers/users/userAuth";
const router = express.Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);
router.get("/user-logged", userLogged);
router.get("/user-logout",userAuth, logOut);

export default router;
