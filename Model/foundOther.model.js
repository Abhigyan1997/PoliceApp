const mongoose = require("mongoose");

const foundOther_Schema = new mongoose.Schema(
    {
        other_description: { type : String},
        other_location: {type: String}, 
        Date_and_time:{ type: Date, 
            default: Date.now()
     },
     userId : {
         type: String
     }
   },
    { timestamps: true }
);

module.exports = mongoose.model("FoundOther", foundOther_Schema);