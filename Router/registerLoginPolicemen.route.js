const express =require('express');
const policemenRouter = express.Router();
const policemenController =require('../Controlller/registerLoginPolicemen.controller');
const AllComplaintsOfAPolice = require('../Controlller/policeManAssigneeComplaint.controller');
const { ExistingPoliceMan } = require('../Middlewares/CheckForExistingPolice');


policemenRouter.post('/register',policemenController.registerPolicewala);
policemenRouter.post('/login',policemenController.loginPolicewala);
policemenRouter.get("/allPoliceMan" , policemenController.GetAllPoliceMen);
policemenRouter.get('/myComplaints' , ExistingPoliceMan , AllComplaintsOfAPolice.PoliceManComplaintAssignee);


module.exports=policemenRouter;