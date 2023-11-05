const express = require("express");
const statuschangerouter= express.Router();
const statuschangecontroller=require('../Controlller/allstatusupdate.controller');
const { ExistingPoliceMan } = require("../Middlewares/CheckForExistingPolice");


statuschangerouter.put('/changeComplaintStatus/:id' , ExistingPoliceMan , statuschangecontroller.allstatusupdatebyid);


module.exports=statuschangerouter
