

const MissingBagModel = require("../Model/missingBag.model")
const MissingHumanModel = require("../Model/missingHuman.model")
const MissingOtherModel = require("../Model/missingOther.model")
const MissingVehicleModel =require("../Model/missingVehicle.model")
const MissingPetModel = require("../Model/missingPet.model")
const MissingMobileModel = require("../Model/missingMobile.model")


const FoundBagModel = require("../Model/foundBag.model")
const FoundHumanModel = require("../Model/foundHuman.model")
const FoundOtherModel = require("../Model/foundOther.model")
const FoundPetModel = require("../Model/foundPet.model")
const FoundVehicleModel = require("../Model/foundVehicle.model")
const FoundMobileModel = require("../Model/foundMobile.model")


const allComplaints = async(req, res) => {
      
        try{


   const MissingBag = await MissingBagModel.find({}).sort({_id: -1}).limit(2)
    const MissingHuman = await MissingHumanModel.find({}).sort({_id: -1}).limit(2)
   const MissingOther  = await MissingOtherModel.find({}).sort({_id: -1}).limit(2)
   const MissingVehicle = await MissingVehicleModel.find({}).sort({_id: -1}).limit(2)
   const MissingPet = await MissingPetModel.find({}).sort({_id: -1}).limit(2)
   const MissingMobile = await MissingMobileModel.find({}).sort({_id: -1}).limit(2)

   const FoundBag = await FoundBagModel.find({}).sort({_id: -1}).limit(2)
    const FoundHuman  = await FoundHumanModel.find({}).sort({_id: -1}).limit(2)
    const FoundOther = await FoundOtherModel.find({}).sort({_id: -1}).limit(2)
    const  FoundPet  = await  FoundPetModel.find({}).sort({_id: -1}).limit(2)
   const FoundVehicle = await FoundVehicleModel.find({}).sort({_id: -1}).limit(2)
   const FoundMobile = await FoundMobileModel.find({}).sort({_id: -1}).limit(2)

//    const allMissingComplaints = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile]
//    const allFoundComplaints = [...FoundBag , ...FoundHuman , ...FoundOther , ...FoundPet , ...FoundVehicle , ...FoundMobile]
                    
//         res.status(200).json({success: true , message : "All Complaints fetched..." , MissingComplaints : allMissingComplaints , Found : allFoundComplaints});


if (MissingBag.length > 0 
   || MissingHuman.length > 0 
     || MissingMobile.length > 0 
       || MissingOther.length > 0 
         || MissingPet.length > 0 
           || MissingVehicle.length > 0
             || FoundBag.length > 0
              || FoundHuman.length > 0
                || FoundOther.length > 0
                 || FoundPet.length > 0
                  || FoundVehicle.length > 0
                   || FoundMobile.length > 0
           ) {
     return res.status(200).json({ success: true, MissingComplaintsmessage: "Missing Complaints Found...", MissingComplaints: { MissingBag, MissingHuman, MissingMobile, MissingOther, MissingPet, MissingVehicle } ,FoundComplaintsmessage: "Found Complaints Found..." , FoundComplaints : {FoundBag,FoundHuman,FoundMobile,FoundOther,FoundVehicle,FoundPet} });
 } 
 
 
 else {
     return res.status(404).json({ success: false, message: "No approved complaints found for this user." });
 }
       }catch (error) {
        return res.status(500).json({success: false, error: error.message });
      }
   
}

module.exports = {allComplaints}