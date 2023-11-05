



const express = require("express");
const PoliceManProfileRouter = express.Router();
const ProfileController = require ("./../Controlller/profileOfPoliceMan.controller");
const { ExistingPoliceMan } = require("../Middlewares/CheckForExistingPolice");


PoliceManProfileRouter.get("/PoliceProfile" , ExistingPoliceMan , ProfileController.GetProfileOfPoliceMan);

module.exports = PoliceManProfileRouter;