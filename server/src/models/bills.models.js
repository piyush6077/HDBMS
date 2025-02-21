import mongoose, {Schema} from 'mongoose'

export const billSchema = new mongoose.Schema({
    patientId:{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    },
    tratmentId:{
        type: Schema.Types.ObjectId,
        ref:"Treatment"
    },
    amount:{
        type: Number,
        required:[true,"Please enter the amount to be paid"]
    },
    billingDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "unpaid"
    }
},{timestamps:true})

export const Bill = mongoose.model("Bill", billSchema)