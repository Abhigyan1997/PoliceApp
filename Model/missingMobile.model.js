const mongoose = require("mongoose");

const missingMobile_Schema = new mongoose.Schema(
    {
        Mobile_date: {type: Date, default: Date.now()},
        userId: {type: String},
        Mobile_Model : {type: String},
        Mobile_Ownername: {type: String},
        Mobile_IMEI1:{type: String},
        Mobile_IMEI2: {type: String},
        Mobile_MissingLocation: {type: String},
        Mobile_MobileNumber: {type: String},
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

module.exports = mongoose.model("MissingMobile", missingMobile_Schema);