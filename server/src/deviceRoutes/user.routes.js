import express from "express"
import { handleLogin, handleSignUp,handleLogout } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use("/signup", handleSignUp)
router.use("/login", handleLogin)
router.use("/logout", verifyJWT, handleLogout)

export default router; 