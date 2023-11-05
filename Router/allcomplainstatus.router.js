const express = require('express');
const allstatusupdateRoute=express.Router();
const allstatusupdateController = require('../Controlller/allcomplainstatus.controller');
const {ExistingUser} = require("./../Middlewares/authMiddleware");

allstatusupdateRoute.get('/statusapproved',ExistingUser,allstatusupdateController.allstatusupdatebyidapproved);
allstatusupdateRoute.get('/statuspending',ExistingUser,allstatusupdateController.allstatusupdatebyidpending);
allstatusupdateRoute.get('/statuscompletes',ExistingUser,allstatusupdateController.allstatusupdatebyidcompletes);

module.exports = allstatusupdateRoute;