const express = require('express');
const bagRouter = express.Router();
const bagController = require('../Controlller/missingBag.controller');
const { ExistingUser } = require("../Middlewares/authMiddleware");

// Register a new user
bagRouter.post('/bagComplaint', ExistingUser , bagController.reportMissingBag);
bagRouter.get('/bagComplaint' ,ExistingUser, bagController.getAllMissingBag);
bagRouter.get('/bagComplaint/:id',ExistingUser, bagController.getMissingBagById);
bagRouter.put('/bagComplaint/:id',ExistingUser, bagController.updateMissingBagById);
bagRouter.delete('/bagComplaint/:id' ,ExistingUser, bagController.deleteBagById);


module.exports = bagRouter; 


