import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        }

    }
)

export const Patient = mongoose.model("Patient" , patientSchema)