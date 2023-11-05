const express = require("express");
const HumanRouter = express.Router();
const humanController = require("./../Controlller/missingHuman.controller");
const { ExistingUser } = require("../Middlewares/authMiddleware");

HumanRouter.post("/missing-human", ExistingUser, humanController.missingHumanReport);
HumanRouter.get("/allMissingHumanReport" , ExistingUser , humanController.allMissingHumans);
HumanRouter.get("/missingHumanReportById/:id" , ExistingUser , humanController.getMissingHumanReportById);
HumanRouter.put("/updateHumanReport/:id" , ExistingUser , humanController.updatehumanMissingReport);
HumanRouter.delete("/deleteMissingHumanComplaint/:id" , ExistingUser , humanController.deleteMissingHumanReport);

module.exports = HumanRouter;
