// routes/userRoutes.js
const express = require('express');
const civilianRouter = express.Router();
const civilianController = require('../Controlller/civilian.controller.js');

// Register a new user
civilianRouter.post('/register', civilianController.registerCivilian);
civilianRouter.post('/login', civilianController.loginCivilian);

module.exports = civilianRouter;
