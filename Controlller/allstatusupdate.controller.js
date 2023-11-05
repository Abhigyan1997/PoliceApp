const MissingBagModel = require("../Model/missingBag.model");
const MissingHumanModel = require("../Model/missingHuman.model");
const MissingMobileModel = require("../Model/missingMobile.model");
const MissingOtherModel = require("../Model/missingOther.model");
const MissingPetModel = require('../Model/missingPet.model');
const MissingVehicleModel = require("../Model/missingVehicle.model");
const PoliceModel = require("../Model/PoliceMan.model");

exports.allstatusupdatebyid = async (req, res) => {
    try {
        const enteredBagId = req.params.id;
        const newStatus = req.body.status; 

        if (req.Police instanceof PoliceModel) {
            const  {id} = await req?.Police;
            const MissingHuman = await MissingHumanModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });
            const MissingMobile = await MissingMobileModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });
            const MissingBag = await MissingBagModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });
            const MissingOther = await MissingOtherModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });
            const MissingPet = await MissingPetModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });
            const MissingVehicle = await MissingVehicleModel.findOneAndUpdate({ _id: enteredBagId }, { status: newStatus, Assignee: id }, { new: true });

            if (MissingBag || MissingHuman || MissingMobile || MissingOther || MissingPet || MissingVehicle)
                return res.status(200).json({ success: true, message: "Status of a Complaint Changed..." , newStatus : newStatus});
            else {
                return res.status(404).json({ success: false, message: "Complaint not found." });
            }
        } else {
            return res.status(403).json({ success: false, message: "Access denied. Only police officers are allowed to update the status." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
