const express =require('express');
const policemenRouter = express.Router();
const policemenController =require('../controller/registerLoginPolicemen.controller');

policemenRouter.post('/register',policemenController.registerPolicewala);
policemenRouter.post('/login',policemenController.loginPolicewala);

module.exports=policemenRouter;