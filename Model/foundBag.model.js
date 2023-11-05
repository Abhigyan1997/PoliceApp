const mongoose = require("mongoose");

const foundBag_Schema = new mongoose.Schema(
    {
        bag_Image:{type: String},
        bag_type: {type: String},
        Date_and_time:{
            type: Date, 
            default: Date.now()
        },
        bag_color: {
            type: String
        },
        bag_location: {
            type: String
        },
        userId : {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("FoundBag", foundBag_Schema);