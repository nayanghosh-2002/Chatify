import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js"; 

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/").get(verifyToken,getOtherUsers); 

export default router;
