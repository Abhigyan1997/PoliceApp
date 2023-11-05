


const express = require("express");
const PetRouter = express.Router();
const PetController = require ("./../Controlller/missingPet.controller");
const { ExistingUser } = require("../Middlewares/authMiddleware");


PetRouter.post("/petComplaint" , ExistingUser , PetController.reportOfMissingPet);
PetRouter.get("/allPetComplaints" , ExistingUser , PetController.getAllMissingPetReport);
PetRouter.get("/petComplaint/:id" , ExistingUser , PetController.getMissingPetReportById);
PetRouter.put("/updatePetComplaint/:id" , ExistingUser , PetController.updateMissingReport);
PetRouter.delete("/deletePetReport/:id" , ExistingUser , PetController.deletePetReport);

module.exports = PetRouter;