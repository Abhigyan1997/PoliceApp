

const mongoose = require("mongoose");

const live_Updates = new mongoose.Schema(
    {
        live_Message : {
            type : String,
            required : true
        },
        altMessage : {
            type : String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("live_Updates", live_Updates);