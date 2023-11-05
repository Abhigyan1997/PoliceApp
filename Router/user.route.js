// routes/userRoutes.js
const express = require('express');
const civilianRouter = express.Router();
const civilianController = require('../Controlller/user.controller');


// Register a new user
civilianRouter.post('/register',civilianController.registerCivilian);
civilianRouter.post('/login', civilianController.loginCivilian);

// for forgot password section
civilianRouter.post('/sendotp',civilianController.Civiliansendotp);
civilianRouter.post('/verfiyotp',civilianController.CivilianverfiyOtp);
civilianRouter.post('/updatePassword',civilianController.Civilianupdatepassword);

module.exports = civilianRouter;


