const mongoose = require("mongoose");

const PhoneBookSchema = new mongoose.Schema(
    {
        userId :{type:String},
        station_name: { type: String, required: true },
        station_city: { type: String, required: true },
        station_state: { type: String, required: true },
        station_number: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("PhoneBook", PhoneBookSchema);