

const express = require("express");
const LiveUpdateRouter = express.Router();
const LiveUpdateController = require("./../Controlller/live_updates.controller")
const { ExistingUser } = require("../Middlewares/authMiddleware");


LiveUpdateRouter.post("/addLiveUpdate" , ExistingUser , LiveUpdateController.createUpdate);
LiveUpdateRouter.get("/allLiveUpdates"  , LiveUpdateController.getLiveUpdates);
LiveUpdateRouter.put("/updateLive/:id" , LiveUpdateController.updateLive);
LiveUpdateRouter.delete("/deleteLive/:id" , ExistingUser , LiveUpdateController.deleteLive_Update);

module.exports = LiveUpdateRouter;