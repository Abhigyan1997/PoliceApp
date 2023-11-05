const mongoose = require("mongoose");

const missingOther_Schema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        Other_date: {
            type: String,
            required: true
        },
        other_Place: {
            type: String,
            required: false
        },
        other_image: {
            type: String,
        },
        userId : {
            type : String
        },
        status: {
            type: String,
            enum: ["approved", "pending", "completed"],
            default: "pending", 
        },
        Assignee : {
            type : String,
            default : ''
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MissingOther", missingOther_Schema);

//image