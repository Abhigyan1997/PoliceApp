

const mongoose = require("mongoose");

const human_Schema = new mongoose.Schema(
    {
        Human_relativename: {
            type : String,
            required : true
        },
        userId : {
            type : String
        },
        Human_name: {
            type : String,
            required : true
        },
        Human_phoneNumber: {
            type : Number,
            required : true
        },
        Human_missingNumber: {
            type : Number,
            required : true
        },
        Human_date: {
            type : Date,
            required : true
        },
        Human_color: {
            type : String,
            required : true
        },
        Human_location: {
            type : String,
            required : true
        },
        Human_image: {
            type : String,
        },
        Human_age: {
            type : Number,
            required : true
        },
        Human_height: {
            type : String,
            required : true
        },
        Human_gender: {
            type : String,
            required : true
        },
        Human_address: {
            type : String,
            required : true
        },
        Human_weight: {
            type : String,
            required : true
        },
        Human_aadharcard: {
            type : Number,
            required : true
        },
        Human_email: {
            type : String,
            required : true
        },
        Human_city: {
            type : String,
            required : true
        },
        Human_state: {
            type : String,
            required : true
        },
        Human_pincode: {
            type : Number,
            required : true
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

module.exports = mongoose.model("MissingHuman", human_Schema);

//image