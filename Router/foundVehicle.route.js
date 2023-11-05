const express = require('express');
const foundVehicleRouter = express.Router();
const FoundVehicleController = require('../Controlller/foundVehicle.controller');
//  const imageUpload = require("../Middlewares/imageUploader.middlewares") 
const {ExistingUser} = require("../Middlewares/authMiddleware")

// Register a new user
foundVehicleRouter.post('/foundVehicle', ExistingUser, FoundVehicleController.createFoundVehicle);
foundVehicleRouter.get('/foundVehicle',ExistingUser ,  FoundVehicleController.getFoundAll);
foundVehicleRouter.get('/foundVehicle/:foundId', ExistingUser, FoundVehicleController.getFoundById);
foundVehicleRouter.put('/foundVehicle/:foundId',ExistingUser,  FoundVehicleController.updateFoundById);
foundVehicleRouter.delete('/foundVehicle/:foundId',ExistingUser, FoundVehicleController.deleteFoundById);
module.exports = foundVehicleRouter;