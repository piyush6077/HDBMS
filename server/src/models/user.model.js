import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: Number,
            required: true
        },
        contactNo: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            enum: ['Male','Female','Other'],
            required: true
        },
        role:{
            type: String,
            enum: ['doctor','patient'],
            required: true
        }
    }
)

export const User = mongoose.model("User", userSchema)