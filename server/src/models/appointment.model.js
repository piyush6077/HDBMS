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
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: props => `${props.value} is not a valid time format!`
            }
        },
        day: {
            type: String,
            enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        endTime: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: props => `${props.value} is not a valid time format!`
            }
        },
        status: {
            type: String,
            enum: ['Scheduled','ReScheduled','Pending','Canceled','Completed'],
            default: 'Scheduled'
        },
    },
    { timestamps:true}
)

export const Appointment = mongoose.model("Appointment" , appointmentSchema)