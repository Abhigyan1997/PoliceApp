const express = require('express');
const foundOtherRouter = express.Router();
const FoundOtherController = require('../Controlller/foundOther.controller');
const {ExistingUser} = require("../Middlewares/authMiddleware")

// Register a new user
foundOtherRouter.post('/foundOther',ExistingUser,  FoundOtherController.createFoundOther);
foundOtherRouter.get('/foundOther', ExistingUser, FoundOtherController.getFoundAll);
foundOtherRouter.get('/foundOther/:foundId',ExistingUser,  FoundOtherController.getFoundById);
foundOtherRouter.put('/foundOther/:foundId',  ExistingUser, FoundOtherController.updateFoundById);
foundOtherRouter.delete('/foundOther/:foundId',ExistingUser,  FoundOtherController.deleteFoundById);
module.exports = foundOtherRouter;