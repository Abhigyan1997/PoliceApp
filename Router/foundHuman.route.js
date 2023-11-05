const express = require('express');
const FoundHumanRouter = express.Router();
const FoundHumanController = require('../Controlller/foundHuman.controller');
const {ExistingUser} = require("./../Middlewares/authMiddleware");

// Register a new user
FoundHumanRouter.post('/foundHuman', ExistingUser , FoundHumanController.reportFoundHuman);
FoundHumanRouter.get('/foundHuman',ExistingUser, FoundHumanController.getFoundAll);
FoundHumanRouter.get('/foundHuman/:foundId',ExistingUser, FoundHumanController.getFoundById);
FoundHumanRouter.put('/foundHuman/:foundId',ExistingUser, FoundHumanController.updateFoundById);
FoundHumanRouter.delete('/foundHuman/:foundId',ExistingUser, FoundHumanController.deleteFoundById);

module.exports = FoundHumanRouter;


