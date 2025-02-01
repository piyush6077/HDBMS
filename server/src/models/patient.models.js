import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"            
        },
        dateOfBirth: {
            type: Date,
            required: true
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