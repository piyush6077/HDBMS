import { Doctor } from "../models/doctor.models.js";
import { Patient } from "../models/patient.models.js";
import {User} from "../models/user.model.js"

const generateAccessAndRefreshToken = async(user)=>{
    try {
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
    
        user.refreshToken = refreshToken
        await user.save()
        return {accessToken , refreshToken}
    } catch (error) {
        throw new Error(`Error generating tokens: ${error.message}`);
    }
}



export const handleSignUp = async (req,res)=>{
    try {

        const {fullname, password , email , contactNo , age, gender , role } = req.body;
    
        if ( !password || !email || !contactNo || !age || !gender || !fullname){
            return res.status(400).json({
                success: false,
                message: "Please fill all Details to Signup/Register"
            })
        }
        
        if(!role){
            return res.status(400).json({message:"Please Specify the role such as Doctor or Patient"})
        }
    
        
        const existingUser = await User.findOne({
            $or: [
                {email},
                {contactNo}
            ]
        })
    
        if(existingUser) return res.status(400).json({success:false , message:"User already existed in the database"})
      
        const user = await User.create({
            fullname,
            age,
            gender,
            password,
            contactNo,
            email,
            role
        })
        
        const createdUser = await User.findById(user._id).select("-password")
    
        if ( role === 'doctor') {          
            const {specialization , availability , experience } = req.body;
            if (!specialization || !availability || !experience ){
                return res.status(400).json({
                    success: false,
                    message: "Please fill all Details to Signup/Register doctor"
                })
            }
            
            const doctor = await Doctor.create({
                UserId : user._id,
                specialization ,
                availability ,
                experience
            })
            return res.status(200).json({success:false , doctor: doctor , user:user})
        }

        
        if( role === 'patient') {

            const {medicalHistory , bloodGroup , dateOfBirth } = req.body; 
            
            if(!medicalHistory || !bloodGroup || !dateOfBirth ) 
                return res.status(400).json({
            success: false,
            message: "Please fill all Details to Signup/Register patient"
        
        })
        
        const patient = await Patient.create({
            userId:user._id,
            medicalHistory,
            bloodGroup,
            dateOfBirth
        })    
        
        return res.status(200).json({success:false , patient: patient , user:user})
    }
        
        return res
        .status(200)
        .json({success:true , message:"User account created Successfully", user:createdUser})
                
    }
        
    catch (error) {
        console.log(error)
        res.status(400).json({success:false , message:"Internal server Error"})
    }
}

export const handleLogin = async (req,res)=>{
    const {email, contactNo , password, role} = req.body;
    if(!password || !contactNo || !password || !role) return res.status(400).json("Please fill all details")

    const user = await User.findOne({
        $or:[{email},{contactNo}]
    })
        
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid) return res.status(401).json({success:false , message:"Invalid Credentials"})
            

    if(!user) return res.status(401).json({success:false , message:"User not found"})

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user)

    const options={
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    }

    return res
    .status(200)
    .cookie('accessToken', accessToken , options)
    .cookie('refreshToken' , refreshToken , options)
    .json({success:true , user}) 
}

export const handleLogout = async (req,res)=>{

    const options = {
        httpOnly: true,
        secure:process.env.NODE_ENV !== "development",
    }

    return res
    .status(200)
    .clearCookie("accessToken", {}, options)
    .clearCookie("refreshToken", {} ,options)
    .json("User Logged Out successfully")
}