const mongoose  =require("mongoose");

const policeManSchema = new mongoose.Schema({

    profileImage:String,
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    mobileNo :{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required : true
    },
    aadharNumber:{
        type:Number,
        required:true,
    },
    Designation:{
        type:String,
        required:true,
    },
    policeStation:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    Fcm_Token:{
        type:String,
    }
});

module.exports = mongoose.model("Police_Schema", policeManSchema);