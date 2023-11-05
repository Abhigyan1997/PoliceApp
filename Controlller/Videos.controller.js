






const VideoModel = require("./../Model/Video.model");

//Best working ---------
const addVideo = async (req, res) => {

    // const origin = req.headers.origin || 'Unknown Origin';

    // const Video = `${origin}/${req.file.path}`;

    //image
   
    try {

       

        const newVideo = new VideoModel({
            Video : req.body.Video,
            altMessage : req.body.altMessage,
            ThumbNail : req.body.ThumbNail
        });

        if (!newVideo) {
            res.json({ message: "Please Fill All The Required Fields." }).status(400);
        } else {
            let newSavedVideo = await newVideo.save();
            res.json({ message: 'Video saved successfully', result:newSavedVideo }).status(201);
        }
    } catch (error) {
        console.log('Error occurred in Banner Image', error.message);
        res.send(error.message).status(500);
    }
}


const getVideos = async (req, res) => {
    try {
        const Videos = await VideoModel.find();

        if (Videos.length === 0) {
            return res.status(404).json({ message: "Videos not found" });
        }

        const videosWithUrls = Videos.map((video) => {
            return {
                Video : `${video.Video}`,
                altMessage : video.altMessage,
                ThumbNail : video.ThumbNail,
                _id: video._id,
                createdAt: video.createdAt,
                updatedAt: video.updatedAt,
                __v: video.__v,
            };
        });

        res.json({ message: "Videos found", result: videosWithUrls }).status(200);
    } catch (error) {
        console.error('Error occurred in Videos get', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getVideoById = async (req, res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const Video = await VideoModel.findOne({_id : enteredId});

        if (!Video) {
            return res.json({ message: "Video not found" }).status(404);
        }
        else {
            res.json({ message: "Video found", result: Video}).status(200);
        }

       
    } catch (error) {
        console.error('Error occurred in Videos getById', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteVideo = async (req,res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const videoToBeDelete = await VideoModel.findOneAndDelete({_id : enteredId});

        if(videoToBeDelete) {
             res.send("Video Deleted successfully...").status(201);
        } else {
            res.send("Video Not Found...").status(400);
        }
    }
    catch (error) {
        console.error('Error occurred in Videos delete', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}


module.exports = {addVideo,getVideos,getVideoById,deleteVideo}