const mongoose = require("mongoose");

const missingBag_Schema = new mongoose.Schema(
    {
       Bag_date : {
            type:Date,
            default: Date.now(),
        },
        Bag_color: {
            type: String,
            required: true
        },
        Bag_location: {
            type: String,
            required: true
        },
         Bag_image :{
          type: String,
        },
        Bag_brand: {
            type: String,
            required: true
        },
        Bag_ownerName:  {
            type: String,
            required: true
        },
        // Bag_address:  {
        //     type: String,
        //     required: true
        // },
        // Bag_city:  {
        //     type: String,
        //     required: true
        // },
        // Bag_state:  {
        //     type: String,
        //     required: true
        // },
        Bag_number:  {
            type: Number,
            required: true
        },
        // Bag_email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            
        // },
        // Bag_aadharcard:  {
        //     type: Number,
        //     required: true
        // },
        // Bag_pin:  {
        //     type: Number,
        //     required: true
        // },
        Bag_type:  {
            type: String,
            required: true
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

module.exports = mongoose.model("MissingBag", missingBag_Schema);