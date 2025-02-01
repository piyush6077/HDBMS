import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        availability: [
            {
                day: {
                    type: String,
                    required: true
                },
                available: {
                    type: Boolean,
                    required: true
                },
                startTime: {
                    type: String, 
                    required: function(){ return this.available},
                    validate: function(v) {
                        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v)
                    },
                    message: props => `${props.value} is not a valid time format!`
                },
                endTime: {
                    type: String,
                    required: function(){ return this.available },
                    validate: function(v) {
                        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v)
                    },
                    message: props => `${props.value} is not a valid time format for end time!`
                }
            }
        ],
    },{ timestamps: true }
)

export const Doctor = mongoose.model("Doctor", doctorSchema)