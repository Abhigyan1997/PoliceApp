





const MissingHuman = require("../Model/missingHuman.model"); 
const sendNotification = require("./../NotificationSending/SendNotificationToPoliceStation");
const PoliceModel = require("./../Model/PoliceMan.model");

const missingHumanReport = async (req, res) => {

        // const origin = req.headers.origin || 'Unknown Origin';
        // const Human_image = `${origin}/${req.file.path}`;
        //image
    try {

      const  {id} = await req?.civilian;

        const missingHumanData = {
            Human_relativename: req.body.Human_relativename,
            Human_name: req.body.Human_name,
            Human_phoneNumber: req.body.Human_phoneNumber,
            Human_missingNumber: req.body.Human_missingNumber,
            Human_date: req.body.Human_date,
            Human_color: req.body.Human_color,
            Human_location: req.body.Human_location,
            Human_age: req.body.Human_age,
            Human_height: req.body.Human_height,
            Human_gender: req.body.Human_gender,
            Human_address: req.body.Human_address,
            Human_weight: req.body.Human_weight,
            Human_aadharcard: req.body.Human_aadharcard,
            Human_email: req.body.Human_email,
            Human_city: req.body.Human_city,
            Human_state: req.body.Human_state,
            Human_pincode: req.body.Human_pincode,
            Human_image:req.body.Human_image,
            userId : id
        };
        

        // Save missing human data to MongoDB
        const missingHuman = new MissingHuman(missingHumanData);
        await missingHuman.save();

      //   const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
       
      const policeStations = await PoliceModel.find({}, 'Fcm_Token');
      const policeStationTokens = policeStations.map((policeStation) => policeStation.Fcm_Token);

      const notificationData = {
        MissingReport_Data : missingHumanData
      };

      console.log(notificationData);

      const notification = await sendNotification(notificationData,policeStationTokens);

        res.status(201).json({ message: "Missing human data saved successfully", status: 201 });
    } catch (error) {
        console.error("Error saving missing human data:", error);
        res.status(500).json({ error: "Failed to save missing human data", err: error });
    }
}

async function allMissingHumans (req, res) {
    try {
      const missingHumans = await MissingHuman.find();
      res.json(missingHumans).status(200);

    } catch (error) {
      console.log(error.message);
      res.json({ error: error.message }).status(500);
    }
  };

  async function getMissingHumanReportById (req,res) {

    const enteredId = req.params.id;
  
    try {
  
        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }
  
        const humanReport = await MissingHuman.findOne({_id : enteredId});
  
        if (!humanReport) {
            return res.json({ message: "Human Missing Report not found" }).status(404);
        }
        else {
            res.json({ message: "missing Report for Human found....", result: humanReport}).status(200);
        }
  
       
    } catch (error) {
        console.error('Error occurred in humanReport getById', error.message);
        res.status(500).json({ error: "Internal Server Error" , message : error.message });
    }
  }
  
  const updatehumanMissingReport = async (req,res) => {
       
    const humanReportId = req.params.id;
    const dataToBeUpdate = req.body;
  
    try {
  
      const updatedHumanReport = await MissingHuman.findByIdAndUpdate(humanReportId, dataToBeUpdate, {
        new: true,
      });
  
      if (!updatedHumanReport) {
        return res.json({ message: 'missingHuman Details not found' }).status(404);
      }
      else if (updatedHumanReport) {
        res.json({ message : "missing Human report updated successfully..." , result : updatedHumanReport}).status(200);
      }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  }
  
  
  const deleteMissingHumanReport = async (req,res) => {
  
    const enteredId = req.params.id;
  
    try {
  
        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }
  
        const missingHumanToBeDelete = await MissingHuman.findOneAndDelete({_id : enteredId});
  
        if(missingHumanToBeDelete) {
             res.send("missing Human Report Deleted successfully...").status(201);
        } else {
            res.send("missing Human Report Not Found...").status(400);
        }
    }
    catch (error) {
        console.error('Error occurred in missing Human report delete', error.message);
        res.status(500).json({ error: "Internal Server Error" , message : error.message });
    }
  
  }
  
module.exports = {missingHumanReport,allMissingHumans,getMissingHumanReportById,deleteMissingHumanReport,updatehumanMissingReport}