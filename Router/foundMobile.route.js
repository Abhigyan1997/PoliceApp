const express = require('express');
const foundMobileRouter = express.Router();
const FoundMobileController = require('../Controlller/foundMobile.controller');
const {ExistingUser} = require("./../Middlewares/authMiddleware");

// Register a new user
foundMobileRouter.post('/foundMobile', ExistingUser, FoundMobileController.createFoundMobile);
foundMobileRouter.get('/foundMobile',ExistingUser, FoundMobileController.getFoundAll);
foundMobileRouter.get('/foundMobile/:foundId',ExistingUser,  FoundMobileController.getFoundById);
foundMobileRouter.put('/foundMobile/:foundId', ExistingUser, FoundMobileController.updateFoundById);
foundMobileRouter.delete('/foundMobile/:foundId',ExistingUser,  FoundMobileController.deleteFoundById);
module.exports = foundMobileRouter; 