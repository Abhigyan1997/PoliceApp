

const express = require("express");
const BannerRouter = express.Router();
const BannerController = require("./../Controlller/banner.controller")




BannerRouter.post("/addBanner" ,  BannerController.addBanner);
BannerRouter.get("/allBanners" , BannerController.getBanners);

module.exports = BannerRouter;