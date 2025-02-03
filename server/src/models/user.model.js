import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

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
        },
        refreshToken:{
            type:String
        }
    }
)

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema)