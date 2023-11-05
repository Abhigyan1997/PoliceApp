const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    address: {
        type: String,
    },
    state: {
        type: String
    },
    landmark: {
        type: String
    },  
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    country: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword : {
        type: String,
    },
    otp: {
        type: String,
        required: true,
        default:' '
    },
    Fcm_Token : {
        type : String,
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports =  UserModel 

