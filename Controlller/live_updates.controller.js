

const updatesModel = require("./../Model/live_Updates.model");


const createUpdate = async (req,res) => {

    try {

        const newUpdate = new updatesModel({
            live_Message : req.body.live_Message,
            altMessage : req.body.altMessage,
        });

        if (!newUpdate) {
            res.json({ message: "Please Fill All The Required Fields." }).status(400);
        } else {
            let newSavedUpdate = await newUpdate.save();
            res.json({ message: 'Live Updates saved successfully', result : newSavedUpdate  }).status(201);
        }
    } catch (error) {
        console.log('Error occurred in update section...', error.message);
        res.send(error.message).status(500);
    }
}


const getLiveUpdates = async (req,res) => {

       let latestUpdates = await updatesModel.find({}).sort({_id: -1}).limit(2);

       try {

        let result = [...latestUpdates];
         
         if (latestUpdates) {
              
             res.json ({ message : "Data Found..." , result : result}).status(200);
         }
         else if (!latestUpdates) {
             res.send("No Data Found...").status(404);
             return ;
         }
       }
       catch (error) {
        console.log('Error occurred in update section...', error.message);
        res.send(error.message).status(500);
    }
}

const updateLive = async (req,res) => {

        const updatesId = req.params.id;
        const dataToBeUpdate = req.body;
    
        try {
    
          const updatedLive = await updatesModell.findByIdAndUpdate(updatesId, dataToBeUpdate, {
            new: true,
          });
    
          if (!updatedLive) {
            return res.json({ message: 'news details not found' }).status(404);
          }
          else if (updatedLive) {
            res.json(updatedLive).status(200);
          }
          
        } catch (error) {
          res.json({ error: error.message }).status(500);
        }
}

const deleteLive_Update = async (req,res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const liveUpdatesToBeDelete = await updatesModel.findOneAndDelete({_id : enteredId});

        if(liveUpdatesToBeDelete) {
             res.send("live update Deleted successfully...").status(201);
        } else {
            res.send("live update Not Found...").status(400);
        }
    }
    catch (error) {
        console.error('Error occurred in live update delete', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {deleteLive_Update,updateLive,getLiveUpdates,createUpdate}