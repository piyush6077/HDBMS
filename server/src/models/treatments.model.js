import mongoose , {Schema} from 'mongoose';

export const treatmentSchema = new mongoose.Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    },
    treatmentDescription:{
        type:String,
        required:[true,"Please enter the description of your treatment"]
    },
    medicationPrescribed:{
        type:String,
        required:[true,"Please enter the medication prescribed"]
    },
    treatmentDate:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true})

export const Treatment = mongoose.model("Treatment", treatmentSchema)