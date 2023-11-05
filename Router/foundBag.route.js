const express = require('express');
const foundBagRouter = express.Router();
const FoundBagController = require('../Controlller/foundBag.controller');
const {ExistingUser} = require("./../Middlewares/authMiddleware");

// Register a new user
foundBagRouter.post('/foundBag', ExistingUser ,  FoundBagController.createFoundBag);
foundBagRouter.get('/foundBag', ExistingUser, FoundBagController.getFoundAll);
foundBagRouter.get('/foundBag/:foundId', ExistingUser, FoundBagController.getFoundById);
foundBagRouter.put('/foundBag/:foundId', ExistingUser,FoundBagController.updateFoundById);
foundBagRouter.delete('/foundBag/:foundId', ExistingUser,FoundBagController.deleteFoundById);

module.exports = foundBagRouter; 


