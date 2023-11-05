const mongoose = require("mongoose");

const foundPet_Schema = new mongoose.Schema(
    {
        pet_image: {type: String},
        pet_color: {type: String},
        pet_location: {type: String}, 
        Date_and_time:{ type: Date, 
            default: Date.now()
     },
     userId : {
         type: String
     }
   },
    { timestamps: true }
);

module.exports = mongoose.model("FoundPet", foundPet_Schema);