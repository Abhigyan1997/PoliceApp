const express = require("express");
const ComplaintRouter = express.Router();
const allComplaintsController = require("../Controlller/allDataFeatch.controller")


ComplaintRouter.get("/allComplaints" ,allComplaintsController.allComplaints);

module.exports = ComplaintRouter;