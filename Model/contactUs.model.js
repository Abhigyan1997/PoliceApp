const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
    {
        name:{type: String },
        email: { type: String },
        phone: { type: Number },
        message: { type: String }
    },
    { timestamps: true }
);
module.exports = mongoose.model("ContactUs", ContactUsSchema);