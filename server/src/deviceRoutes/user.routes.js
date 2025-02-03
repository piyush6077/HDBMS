import express from "express"
import { handleSignUp } from "../controllers/user.controllers.js";

const router = express.Router();

router.use("/signup", handleSignUp)

export default router;