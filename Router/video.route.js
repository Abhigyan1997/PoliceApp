

const express = require("express");
const VideoRouter = express.Router();
const VideoController = require("./../Controlller/Videos.controller")



VideoRouter.post("/addVideo" , VideoController.addVideo);
VideoRouter.get("/allVideos" ,  VideoController.getVideos);
VideoRouter.get("/video/:id" , VideoController.getVideoById);
VideoRouter.delete("/deleteVideo/:id" ,VideoController.deleteVideo);

module.exports = VideoRouter;

//image