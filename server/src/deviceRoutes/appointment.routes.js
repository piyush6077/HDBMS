import express from "express";
import {handleAppointments} from "../controllers/appointment.controller.js";
import { deleteAppointment } from "../controllers/appointment.controllers.js";

const router = express.Router();

router.get("/appointments", handleAppointments);
router.get("/cancel-appointment" , deleteAppointment)