const express = require("express");
const otherRouter = express.Router();
const missingOtherController = require("./../Controlller/missingOther.controller");
//image
const { ExistingUser } = require("../Middlewares/authMiddleware");

otherRouter.post("/otherComplaint" ,  ExistingUser, missingOtherController.createOther);
otherRouter.get("/otherComplaints" , ExistingUser, missingOtherController.getAllMissingReportInOtherCategory);
otherRouter.get("/otherComplaint/:id" , ExistingUser, missingOtherController.getComplaintsOfOtherById);
otherRouter.put("/updateOtherComplaint/:id" ,ExistingUser,missingOtherController.updateDetailsForOther);
otherRouter.delete("/deleteOtherComplaint/:id" , ExistingUser,missingOtherController.deleteOther);

module.exports = otherRouter;