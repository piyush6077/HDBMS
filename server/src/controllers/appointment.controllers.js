import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.models.js";
import { Patient } from "../models/patient.models.js";

export const handleAppointments = async(req, res)=>{    
    try {
        const { startTime , endTime , appointmentDate ,doctorId } = req.body; 
        if(!startTime || !endTime || !appointmentDate || !doctorId){
            return res.status(400).json({message: "Please provide all required fields"});
        }
        
        const patientId = req.user?._id;
        if(!patientId){
            return res.status(400).json({message: "You are not a patient"});
        }       
        
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate,
            $or:[
                {startTime: {$lt: endTime} , endTime: {$gt: startTime}}
            ]
        })
        if(existingAppointment) return res.status(409).json({message: "The current doctor has an Appointment at the selected Time"})
    
    
        const doctorExist = await Doctor.findOne({doctorId});
        console.log(doctorExist);
        if(!doctorExist){
            return res.status(400).json({success:false,message:"Doctor does not exist"})
        }
    
        
        const patientExist = await Patient.findOne({patientId});
        if(!patientExist){
            return res.status(400).json({success:false,message:"Patient does not exist"})
        }
    
        const appDate = new Date(appointmentDate);
        const options = {weekday:"long"}
        const day = appDate.toLocaleDateString("en-Us",options)
    
        console.log(day)
        const doctor = await Doctor.findOne({
            doctorId: doctorId,
            availability:{
                $elemMatch:{
                    "day": { $in: [day] },
                    "available": true,
                    "startTime": {$lte: endTime},
                    "endTime": {$gte : startTime}          
                }
            }
        }
        );
    
        if(!doctor){
            return res.status(400).json({success: false , message: "Doctor is not availabe at that time"})
        }
    
        const appointmentStatus = 'pending'
        
        const appointment = await Appointment.create({
            day,
            startTime,
            endTime,
            appointmentDate,
            doctorId,
            patientId,
            status: appointmentStatus
        })
    
        return res.status(201).json({message:"Appointment created successfully" , Appointment: appointment})
     
    } catch (error) {
        console.log("Error creating an Appointment", error)
        return res.status(500).json({message:"Internal Server Error"})
    }   
}


export const deleteAppointment = async (req,res) =>{
    try {
        const {appointmentId} = req.params;
        const patientId = req.user?._id
        
        const appointment = await Appointment.findById(appointmentId) 
        if(!appointment) return res.status(400).json({message:"No such appointment found"})
    
        if(appointment.patientId.toString() !== patientId){
            return res.status(400).json({message:"You can only cancel your own appointments"})
        }
    
        await appointment.findByIdAndDelete(appointmentId)  
    
    } catch (error) {
        console.log("Error deleting the Appointment",error);
        return res.status(500).json({message:error.message})
    }
}


export const getDoctors = (req,res) => {
    return res.status(201).json({message:"get doctors"} , req.user)
}

