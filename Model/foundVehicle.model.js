const mongoose = require("mongoose");

const foundVehicle_Schema = new mongoose.Schema(
    {
       
        Vehicle_image: {type :String},
        Vehicle_brand: { type :String},
        found_location: {type: String},
        vehicle_type: {type: String},
        Date_and_time:{ type: Date, 
            default: Date.now()
     },
     userId : {
         type: String
     }
      
    },
    { timestamps: true }
);

module.exports = mongoose.model("FoundVehicle", foundVehicle_Schema);