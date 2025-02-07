import Doctor from "../models/doctor.model";

export const handleAppointments = async(req, res)=>{
    // req.user
    // validate
    // check if doctor is available in that time period
    // if available then create an appointment and send the response back to client
    // assign the appointment to a doctor
    const { startTime , endTime , appointmentDate , doctorId , patientId , status } = req.body;
    if(!startTime || !endTime || !appointmentDate){
        return res.status(400).json({message: "Please provide all required fields"});
    }

    const appDate = new Date(appointmentDate);
    const options = {weekday:"long"}
    const day = appDate.toLocaleDateString("en-Us",options)

    const doctor = await Doctor.findOne({
        _id:doctorId,
        availablity:{
            $elemMatch:{
                "day": day,
                "available.startTime": startTime,
                "available.endTime": endTime          
            }
        }
    }
    );

    
}




export const getDoctors = (req,res) => {
    return res.status(201).json({message:"get doctors"} , req.user)
}

