

const express = require("express");
const ProfileRouter = express.Router();

const profileController = require("./../Controlller/profileController");
const { ExistingUser } = require("../Middlewares/authMiddleware");



ProfileRouter.get("/myProfile" ,  ExistingUser , profileController.GetProfile);


module.exports = ProfileRouter;