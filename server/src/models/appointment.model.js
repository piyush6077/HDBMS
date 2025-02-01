import mongoose , { Schema } from "mongoose"

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        appointmentDate: {
            type: Date,
            required: true   
        },
        startTime:{
            type: String,
            required: true,
            validate: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        },
        endTime: {
            type: String,
            required: true,
            validate: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        },
        Status: {
            type: String,
            enum: ['Scheduled','ReScheduled','Pending','Canceled','Completed'],
            default: 'Scheduled'
        },
    },
    { timestamps:true}
)

export const Appointment = mongoose.model("Appointment" , appointmentSchema)