import { Doctor } from "../models/doctor.models.js";
import { Patient } from "../models/patient.models.js";
import {User} from "../models/user.model.js"


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
    
        if ( role === 'Doctor') {

            
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
        }

        
        if( role === 'Patient') {

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