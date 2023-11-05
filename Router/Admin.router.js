


const express = require('express');
const AdminRouter = express.Router();
const AdminController = require('../Controlller/Admin.controller');
const AllComplaints = require("./../Controlller/allDataFeatch.controller");
const AllUsers = require("./../Controlller/user.controller");
const { ExistingAdmin } = require('../Middlewares/checkForExistingAdmin');
const AllPolice = require("./../Controlller/registerLoginPolicemen.controller");

AdminRouter.post("/signUp" , AdminController.AdminSignUp);
AdminRouter.post("/signIn" , AdminController.AdminLogin);
AdminRouter.get("/allRegisteredComplaints" , ExistingAdmin , AllComplaints.allComplaints);
AdminRouter.get("/allUsers" , ExistingAdmin , AllUsers.allUsers);
AdminRouter.get("/allRegisteredPolice" ,  ExistingAdmin , AllPolice.GetAllPoliceMen);


module.exports = AdminRouter;