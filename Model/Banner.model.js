




const mongoose = require("mongoose");

const Banner_Model = new mongoose.Schema(
    {
        Banner_image : {
            type : String,
            required : true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Banner_Schema", Banner_Model);


//image