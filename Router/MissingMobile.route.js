const express = require("express");
const MobileRouter = express.Router();
const missingMobileController = require("./../Controlller/missingMobile.controller");
const { ExistingUser } = require("../Middlewares/authMiddleware");

MobileRouter.post("/missingMobile", ExistingUser, missingMobileController.createMissingMobile);
MobileRouter.get("/missingMobile", ExistingUser, missingMobileController.getMissingAllMobile );
MobileRouter.get("/missingMobile/:mobileId", ExistingUser, missingMobileController.getMissingMobileById);
MobileRouter.put("/missingMobile/:mobileId", ExistingUser, missingMobileController.updateMissingMobileById);
MobileRouter.delete("/missingMobile/:mobileId", ExistingUser, missingMobileController.deleteMissingMobileById);

module.exports = MobileRouter;