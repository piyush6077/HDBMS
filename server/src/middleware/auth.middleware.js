import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async(req,res,next)=>{
    const token = req.cookies.accessToken || req.headers.authorization.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    try {
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            return res.status(401).json({message:"Unauthorized Token"})
        }
    
        const user = await User.findById(decodedToken.id).select("-password -refreshToken")
    
        req.user = user
        next()
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server Error")
    }
} 