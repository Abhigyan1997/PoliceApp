

const express = require("express");
const { postEmergancyCall, getemergancynotification, deletenotification, getAllnotification, acceptCallRequest } = require("../Controlller/emergancyCall.controller");
const { ExistingUser } = require("../Middlewares/authMiddleware");
const rounter = express.Router();


 const emergancyRoute = rounter.post("/emergancy-call" , postEmergancyCall );
 const getnotificationRoute = rounter.get("/get-notification" , getemergancynotification);
 const deletenotificationRoute = rounter.delete("/delete-notification/:id" , deletenotification);
 const getAllnotificationRoute = rounter.get("/all-notification" , getAllnotification);
 const acceptCallRequestRoute = rounter.patch("/accept/:id" , acceptCallRequest);

module.exports = {emergancyRoute ,getnotificationRoute ,acceptCallRequestRoute,deletenotificationRoute,getAllnotificationRoute };