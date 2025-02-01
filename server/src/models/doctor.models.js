import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
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