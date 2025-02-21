import { Treatment } from "../models/treatments.model";


export const createTreatment = async (req, res) => {
    try {
        const role = req.user.role;
        if(role !== 'doctor') return res.status(401).json({message:'Unauthorized'})

        const {appointmentId, treatmentDescription, medicationPrescribed} = req.body;
    
        if(!appointmentId || !treatmentDescription || !medicationPrescribed){
            return res.status(400).json({message:"Please enter all the fields"})
        }
    
        const appointment = await Appointment.findById(appointmentId)
        if(!appointment) return res.status(400).json({message:"No such appointment found"})
    
        const treatment = await Treatment.create({
            appointmentId,
            treatmentDescription,
            medicationPrescribed
        })
    
        return res.status(201).json(treatment) , "Treatment Info saved successfully";
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})    
    }
}

export const getAllTreatments = async(req,res)=>{
    try {
        const treatments = await Treatment.find().populate('appointmentId')
        return res.status(200).json(treatments,  "All Treatments Fetched successfully");
    }catch(err){
        console.log(err);   
        return res.status(500).json({message:err.message});
    }
}

export const getTreatment = async(req,res)=>{
    try {
        const {treatmentId} = req.params;
        const treatment = await Treatment.findById(treatmentId).populate('appointmentId')
        return res.status(200).json(treatment, "Treatment fetched successfully");
    }catch(err){
        console.log(err);   
        return res.status(500).json({message:err.message});
    }   
}

export const updateTreatment = async (req,res) =>{
    try {
        const {treatmentId} = req.params;
        const {treatmentDescription, medicationPrescribed} = req.body;
    
        const treatment = await Treatment.findById(treatmentId)
        if(!treatment) return res.status(400).json({message:"No such treatment found"})
    
        const updatedTreatment = await Treatment.findByIdAndUpdate(treatmentId,
            {
                $set:{
                    treatmentDescription,
                    medicationPrescribed
                }
            }
        )
    
        return res.status(200).json(updatedTreatment,"Treatment Updated Successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

export const deleteTreatment = async (req,res) =>{
    const role = req.user.role;
    if(role !== 'doctor') return res.status(401).json({message:'Unauthorized'})
    
    try{
        const {treatmentId} = req.params;
    
        const deletedTreatment = await Treatment.findByIdAndDelete(treatmentId)
        return res.status(200).json(deletedTreatment,"Treatment Deleted Successfully")  
    }
    catch(error){
        console.log(error);
        return res.status(500).json("Error deleting the treatment")
    }
}