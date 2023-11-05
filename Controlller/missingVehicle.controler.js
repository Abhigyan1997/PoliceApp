

const missingVehicle = require("../Model/missingVehicle.model");
const PoliceModel = require("./../Model/PoliceMan.model");
const sendNotification = require ("./../NotificationSending/SendNotificationToPoliceStation");

async function reportMissingVehicle (req,res) {
     
    // const origin = req.headers.origin || 'Unknown Origin';

    const {
      Vehicle_name,
      Vehicle_color,
      Vehicle_Missinglocation,
      Vehicle_brand,
      Vehicle_model,
      Vehicle_hounarname,
      Vehicle_CHaiseNumber,
      Vehicle_number,
      Vehicle_phoneNumber,
      Vehicle_bodynumber,
      Vehicle_enginenumber,
      Vehicle_type,
      Vehicle_image
    } = req.body;

    // const Vehicle_image = `${origin}/${req.file.path}`;
    // const Vehicle_image = `${req.file.path}`;
    //image
    try{
      const  { id} = await req?.civilian;

        if(!req.body) {
            res.send("Please fill all the details of vehicle...").status(400)
        }

        const newMissingVehicle = new missingVehicle({
          Vehicle_name,
          Vehicle_color,
          Vehicle_Missinglocation,
          Vehicle_CHaiseNumber,
          Vehicle_brand,
          Vehicle_model,
          Vehicle_hounarname,
          Vehicle_number,
          Vehicle_phoneNumber,
          Vehicle_bodynumber,
          Vehicle_enginenumber,
          Vehicle_type,
          Vehicle_image,
          userId : id
          });
    
          const savedMissingVehicle = await newMissingVehicle.save();

          // const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
          
          const policeStations = await PoliceModel.find({}, 'Fcm_Token');
          const policeStationTokens = policeStations.map((policeStation) => policeStation.Fcm_Token);
          
          const notificationData = {
              MissingReport_Data : newMissingVehicle
            };

            console.log(notificationData);
    
            const notification = await sendNotification(notificationData,policeStationTokens);

          res.status(201).json({ message: 'Complaint about missing vehicle saved successfully', result: savedMissingVehicle });

    } catch (error) {
        console.log('Error occured while saving data...', error.message);
        res.json({message : error.message}).status(500)
    }

    

} 
async function allMissingVehicles (req, res) {
    try {
      const missingVehicles = await missingVehicle.find();
      res.json(missingVehicles).status(200);

    } catch (error) {
      console.log(error.message);
      res.json({ error: error.message }).status(500);
    }
  };

async function missingVehicleById (req, res) {

    const vehicleId = req.params.id;
    try {

        if(!vehicleId) {
            res.json({message : "Please Provide Id to fetch the data..."})
        }
        else if(vehicleId) {
            const vehicle = await missingVehicle.findById(vehicleId);
            if (!vehicle) {
                return res.json({ message: 'Vehicle details not found' }).status(404);
              }
              res.json(vehicle).status(200);
        }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  }

 async function updateVehicleDetails (req, res) {

  const vehicleId = req.params.id;
  const dataToBeUpdate = req.body;

    try {

      const updatedVehicle = await missingVehicle.findByIdAndUpdate(vehicleId, dataToBeUpdate, {
        new: true,
      });

      if (!updatedVehicle) {
        return res.json({ message: 'Vehicle details not found' }).status(404);
      }
      else if (updatedVehicle) {
        res.json(updatedVehicle).status(200);
      }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  }


async function deleteVehicleComplaint (req, res) {

  const vehicleId = req.params.id;

    try {

      const deletedVehicle = await missingVehicle.findByIdAndRemove(vehicleId);

      if (!deletedVehicle) {
        return res.json({ message: 'Vehicle data not found' }).status(404);
      }

      else if(deletedVehicle) {
        res.send("Vehicle Details Removed Successfully...").status(204);
      }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  };

module.exports = {reportMissingVehicle,allMissingVehicles,missingVehicleById,updateVehicleDetails,deleteVehicleComplaint}