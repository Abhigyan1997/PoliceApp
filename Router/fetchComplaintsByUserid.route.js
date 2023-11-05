


const express = require("express");
const ComplaintsRouter = express.Router();
const ComplaintsController = require ("../Controlller/fetchComplaintsByUserId");
const { ExistingUser } = require("../Middlewares/authMiddleware");


ComplaintsRouter.get ("/userComplaints" , ExistingUser , ComplaintsController.allComplaints);

module.exports =  ComplaintsRouter;