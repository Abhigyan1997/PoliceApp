



const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    image: {
        type: String
    }, 
    mobileno: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    country: {
        type: String
    },
    state:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword : {
        type: String,
    },
    Fcm_Token : {
        type : String,
    }
});

const AdminModel  = mongoose.model('Admin', AdminSchema);

module.exports =  AdminModel 

