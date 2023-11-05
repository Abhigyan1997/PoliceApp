

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

            const  {id} = await req?.civilian;


   const MissingBag = await MissingBagModel.find({ userId : id }).sort({_id: -1}).limit(2)
    const MissingHuman = await MissingHumanModel.find({userId : id}).sort({_id: -1}).limit(2)
   const MissingOther  = await MissingOtherModel.find({userId : id}).sort({_id: -1}).limit(2)
   const MissingVehicle = await MissingVehicleModel.find({userId : id}).sort({_id: -1}).limit(2)
   const MissingPet = await MissingPetModel.find({userId : id}).sort({_id: -1}).limit(2)
   const MissingMobile = await MissingMobileModel.find({userId : id}).sort({_id: -1}).limit(2)

   const FoundBag = await FoundBagModel.find({userId : id}).sort({_id: -1}).limit(2)
    const FoundHuman  = await FoundHumanModel.find({userId : id}).sort({_id: -1}).limit(2)
    const FoundOther = await FoundOtherModel.find({userId : id}).sort({_id: -1}).limit(2)
    const  FoundPet  = await  FoundPetModel.find({userId : id}).sort({_id: -1}).limit(2)
   const FoundVehicle = await FoundVehicleModel.find({userId : id}).sort({_id: -1}).limit(2)
   const FoundMobile = await FoundMobileModel.find({userId : id}).sort({_id: -1}).limit(2)

   const allMissingComplaints = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile]
   const allFoundComplaints = [...FoundBag , ...FoundHuman , ...FoundOther , ...FoundPet , ...FoundVehicle , ...FoundMobile]
                    
        res.status(200).json({success: true , message : "Complaints fetched against the entered userId..." , MissingComplaints : allMissingComplaints , Found : allFoundComplaints});

       }catch (error) {
        return res.status(500).json({success: false, error: error.message });
      }
   
}

module.exports = {allComplaints}