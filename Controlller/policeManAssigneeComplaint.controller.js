

const MissingBagModel = require("../Model/missingBag.model")
const MissingHumanModel = require("../Model/missingHuman.model")
const MissingMobileModel = require("../Model/missingMobile.model")
const MissingOtherModel =require("../Model/missingOther.model")
const MissingPetModel=require('../Model/missingPet.model')
const MissingVehicleModel=require("../Model/missingVehicle.model")


const  PoliceManComplaintAssignee = async (req,res) => {
      
       try {
        const  {id,name} = await req?.Police;
        const query = { Assignee : id  };


        const MissingHuman = await MissingHumanModel.find(query);
        const MissingMobile = await MissingMobileModel.find(query);
        const MissingBag = await MissingBagModel.find(query);
        const MissingOther = await MissingOtherModel.find(query);
        const MissingPet = await MissingPetModel.find(query);
        const MissingVehicle = await MissingVehicleModel.find(query);

        let AllComplaintsWithTheEnteredPolice = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile];

        if (AllComplaintsWithTheEnteredPolice) {

            return res.status(200).json({success : true , message : "hello " + name +", your police ID Is " + id + " , here is the all listed complaints list , where you changed the complaint status..." ,AllComplaints : AllComplaintsWithTheEnteredPolice});
      } else {
              return res.status(404).json({ success: false, message: "No complaints found for this PoliceMan..." });
          }
 
       }
       catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {PoliceManComplaintAssignee};