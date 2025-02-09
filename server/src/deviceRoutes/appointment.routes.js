import express from "express";
// import { deleteAppointment } from "../controllers/appointment.controllers.js";
import { handleAppointments } from "../controllers/appointment.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/appi", verifyJWT, handleAppointments);
// router.delete("/cancel-appointment" , deleteAppointment)
console.log("hello")    

export default router;