const express = require('express');
const foundPetRouter = express.Router();
const FoundPetController = require('../Controlller/foundPet.controller');
// const imageUpload = require("../Middlewares/imageUploader.middlewares") ;
const {ExistingUser} = require("../Middlewares/authMiddleware")

// Register a new user
foundPetRouter.post('/foundPet',ExistingUser ,  FoundPetController.createFoundPet);
foundPetRouter.get('/foundPet',ExistingUser , FoundPetController.getFoundAll);
foundPetRouter.get('/foundPet/:foundId', ExistingUser , FoundPetController.getFoundById);
foundPetRouter.put('/foundPet/:foundId', ExistingUser , FoundPetController.updateFoundById);
foundPetRouter.delete('/foundPet/:foundId', ExistingUser , FoundPetController.deleteFoundById );
module.exports = foundPetRouter;