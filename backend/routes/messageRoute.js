import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import verifyToken from "../middleware/verifyToken.js"; // <-- New import

const router = express.Router();

router.route("/send/:id").post(verifyToken,sendMessage); // <-- New usage
router.route("/:id").get(verifyToken, getMessage); // <-- New usage

export default router;
