





const NewsModel = require("./../Model/News.model");


const addNews = async(req,res) => {

    // const origin = req.headers.origin || 'Unknown Origin';

    // const news_image = `${origin}/${req.file.path}`;
    //image
   
    try {

        
        const newNews = new NewsModel({
            image : req.body.image,
            Title : req.body.title,
            Description : req.body.description
        });

        if (!newNews) {
            res.json({ message: "Please Fill All The Required Fields." }).status(400);
        } else {
            let newSavedNews = await newNews.save();
            res.json({ message: 'News saved successfully', result : newSavedNews }).status(201);
        }
    } catch (error) {
        console.log('Error occurred in Banner Image', error.message);
        res.send(error.message).status(500);
    }
}


const getNews = async (req, res) => {
    try {
        const News = await NewsModel.find();

        if (!News) {
            return res.status(404).json({ message: "News not found" });
        }

        const allNews = News.map((news) => {
            return {
                Image : `${news.image}`,
                News : news.News,
                _id: news._id,
                createdAt: news.createdAt,
                updatedAt: news.updatedAt,
                __v: news.__v,
            };
        });

        res.json({ message: "News found", result: allNews }).status(200);
    } catch (error) {
        console.error('Error occurred in News get', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getNewsById = async(req,res) => {
     
    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const News = await NewsModel.findOne({_id : enteredId});

        if (!News) {
            return res.json({ message: "News not found" }).status(404);
        }
        else {
            res.json({ message: "News found", result: News}).status(200);
        }

       
    } catch (error) {
        console.error('Error occurred in News getById', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const deleteNews = async (req,res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const newsToBeDelete = await NewsModel.findOneAndDelete({_id : enteredId});

        if(newsToBeDelete) {
             res.send("News Deleted successfully...").status(201);
        } else {
            res.send("News Not Found...").status(400);
        }
    }
    catch (error) {
        console.error('Error occurred in News delete', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const updateNews = async (req,res) => {
     
    const newsId = req.params.id;
    const dataToBeUpdate = req.body;

    try {

     ; const updatedNews = await NewsModel.findByIdAndUpdate(newsId, dataToBeUpdate, {
        new: true,
      })

      if (!updatedNews) {
        return res.json({ message: 'news details not found' }).status(404);
      }
      else if (updatedNews) {
        res.json(updatedNews).status(200);
      }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
}


module.exports = {addNews,getNews,getNewsById,deleteNews,updateNews}