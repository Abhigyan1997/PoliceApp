const mongoose  =require("mongoose");

const policemenSchema = new mongoose.Schema({
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
    mobile:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
    },
    aadharNumber:{
        type:Number,
        unique:true,
        required:true,
    },
    rank:{
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
    coordinates:{
        type:[Number],
        index:'2dsphere',
    },
});
const PolicemenModel = mongoose.model('Policemen',policemenSchema);
module.exports={PolicemenModel}