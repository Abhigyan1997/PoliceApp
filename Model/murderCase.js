const mongoose = require("mongoose");

const murder_Schema = new mongoose.Schema(
  {
    Muder_name: String,
    Muder_height: String,
    Muder_weight: Number,
    Muder_color: String,
    Muder_clothes: String,
    Muder_bloodgroup: String,
    Muder_image: String,
    Muder_gender: String,
    Muder_location: String,
    Muder_email: String,
    Muder_date: Date,
    Muder_number: Number,
    Muder_city: String,
    Muder_address: String,
    Muder_pincode: null,
    Muder_identifactionmark: String,
    Muder_reporthounor: String,
    Muder_hounoraddress: String,
    Muder_hounornumber: null,
    Muder_hounoraadharcard: Number,
    Muder_hounorcity: String,
    Muder_Complaineid: null,
    Muder_hounoremail: String,
    Muder_vitnas: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MurderReport", murder_Schema);
