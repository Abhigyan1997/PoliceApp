const mongoose = require("mongoose");

const Pet_Schema = new mongoose.Schema(
    {
        Pet_date:  {
        type: String,
        trim: true,
        required: true,
      },
      Pet_MissingLocation : {
        type: String,
      },
        Pet_color:  {
        type: String,
        trim: true,
      },
        Pet_image:  {
        type: String,
      },
        Pet_Breed:  {
        type: String,
      },
        Pet_Ownername:  {
        type: String,
        trim: true,
        required: true,
      },
        Pet_phonenumber:  {
        type: String,
        trim: true,
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

module.exports = mongoose.model("MissingPet", Pet_Schema);