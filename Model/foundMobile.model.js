const mongoose = require("mongoose");

const foundMobile_Schema = new mongoose.Schema(
    {
        mobile_brand: {type: String},
        mobile_location: {type: String}, 
        mobile_image: {type: String},
        Date_and_time:{ type: Date, 
                  default: Date.now()
        },
        userId : {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("FoundMobile", foundMobile_Schema);