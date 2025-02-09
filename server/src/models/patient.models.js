import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        patientId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"            
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        bloodGroup:{
            type:String,
            enum:["O+","O-","B+","B-","AB+","AB-","A+","A-"],
        },
        medicalHistory:[
            {
                type: String,
                required: true
            }
        ]
    }
)

export const Patient = mongoose.model("Patient" , patientSchema)