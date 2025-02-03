import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
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
            enum: ['Male','Female','Other'],
            required: true
        },
        role:{
            type: String,
            enum: ['Doctor','Patient'],
            required: true
        }
    }
)

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }

    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)