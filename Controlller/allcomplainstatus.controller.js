const MissingBagModel = require("../Model/missingBag.model")
const MissingHumanModel = require("../Model/missingHuman.model")
const MissingMobileModel = require("../Model/missingMobile.model")
const MissingOtherModel =require("../Model/missingOther.model")
const MissingPetModel=require('../Model/missingPet.model')
const MissingVehicleModel=require("../Model/missingVehicle.model")


exports.allstatusupdatebyidapproved = async (req, res) => {
    try {
        const  { id} = await req?.civilian;
        const query = { userId: id, status: "approved" };
        const MissingHuman = await MissingHumanModel.find(query);
        const MissingMobile = await MissingMobileModel.find(query);
        const MissingBag = await MissingBagModel.find(query);
        const MissingOther = await MissingOtherModel.find(query);
        const MissingPet = await MissingPetModel.find(query);
        const MissingVehicle = await MissingVehicleModel.find(query);
 

      let AllApprovedComplaints = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile]

         if (AllApprovedComplaints) {
          return res.status(200).json({ success: true, message: "Approved Complaints Found...", approvedComplaints: AllApprovedComplaints});
    } else {
            return res.status(404).json({ success: false, message: "No approved complaints found for this user." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

    
exports.allstatusupdatebyidpending = async (req, res) => {
    try {
        const { id } = req?.civilian;
        const status = "pending";
        const query = { userId: id, status };

        const MissingHuman = await MissingHumanModel.find(query);
        const MissingMobile = await MissingMobileModel.find(query);
        const MissingBag = await MissingBagModel.find(query);
        const MissingOther = await MissingOtherModel.find(query);
        const MissingPet = await MissingPetModel.find(query);
        const MissingVehicle = await MissingVehicleModel.find(query);

        let AllPendingComplaints = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile]

     
        if (AllPendingComplaints) {
            return res.status(200).json({ success: true, message: "Pending Complaints Found...", pendingComplaints: AllPendingComplaints});
        } else {
            return res.status(404).json({ success: false, message: "No pending complaints found for this user." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



exports.allstatusupdatebyidcompletes = async (req, res) => {
    try {
        const { id } = req?.civilian;
        const status = "completed";
        const query = { userId: id, status };

        const MissingHuman = await MissingHumanModel.find(query);
        const MissingMobile = await MissingMobileModel.find(query);
        const MissingBag = await MissingBagModel.find(query);
        const MissingOther = await MissingOtherModel.find(query);
        const MissingPet = await MissingPetModel.find(query);
        const MissingVehicle = await MissingVehicleModel.find(query);

        let AllCompletedComplaints = [...MissingBag, ...MissingHuman, ...MissingOther, ...MissingVehicle , ...MissingPet, ...MissingMobile]

        
        if (AllCompletedComplaints) {
            return res.status(200).json({ success: true, message: "Completed Complaints Found...", completedComplaints: AllCompletedComplaints });
        } else {
            return res.status(404).json({ success: false, message: "No completed complaints found for this user." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
