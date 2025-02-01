import express from "express"
import { handleSignUp } from "../controllers/user.controllers";

const router = express.Router();

router.use("/signUp", handleSignUp)

export default router;