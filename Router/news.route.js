

const express = require("express");
const NewsRouter = express.Router();
const NewsController = require("./../Controlller/news.controller")



NewsRouter.post("/addNews" , NewsController.addNews);
NewsRouter.get("/allNews" ,  NewsController.getNews);
NewsRouter.get("/News/:id" ,  NewsController.getNewsById);
NewsRouter.delete("/deleteNews/:id" , NewsController.deleteNews);
NewsRouter.put("/updateNews/:id" , NewsController.updateNews);

module.exports = NewsRouter;


//image