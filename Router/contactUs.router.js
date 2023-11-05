const express = require("express");
const ContactUsRouter = express.Router();
const allComplaintsController = require("../Controlller/contactUs.controller")


ContactUsRouter.post("/contactUsData" ,allComplaintsController.createContactUs);
ContactUsRouter.get("/contactUsData" ,allComplaintsController.getAllContactUs);

module.exports = ContactUsRouter;