import express from "express";
import { 
    confirmAppointment, 
    deleteAppointment, 
    getDoctors, 
    handleAppointments, 
    updateAppointment }
from "../controllers/appointment.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/appi", verifyJWT, handleAppointments);
router.delete("/cancel-appointment" , verifyJWT, deleteAppointment)
router.put("/update-appointment", verifyJWT , updateAppointment)
router.post('/confirm',verifyJWT, confirmAppointment)
router.get("/doctors", verifyJWT , getDoctors)

export default router;