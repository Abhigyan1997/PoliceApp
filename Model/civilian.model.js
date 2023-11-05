const mongoose = require('mongoose');

const civilianSchema = new mongoose.Schema({
    mobileno: {
        type: Number,
        unique: true,
        required: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
    },
    aadharNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String
    },
    pincode: {
        type: Number,
    },
    password: {
        type: String,
    },
});

const CivilianModel = mongoose.model('Civilian', civilianSchema);

module.exports = { CivilianModel }
