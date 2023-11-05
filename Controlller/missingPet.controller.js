




const PetModel = require ("./../Model/missingPet.model");
const sendNotification = require ("./../NotificationSending/SendNotificationToPoliceStation");
const PoliceModel = require("./../Model/PoliceMan.model");


const reportOfMissingPet = async (req,res) => {
     
    try {

        const  {id} = await req?.civilian;

        const newPetReport = new PetModel({
            ...req.body , userId : id
     });

        if (!newPetReport.Pet_date ) {
            res.json({ message: "Please Fill All The Required Fields." }).status(400);
        } else {

            let newSavedPetReport = await newPetReport.save();

            
            // const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
            const policeStations = await PoliceModel.find({}, 'Fcm_Token');
            const policeStationTokens = policeStations.map((policeStation) => policeStation.Fcm_Token);
           
            const notificationData = {
               MissingReport_Data : newPetReport
            };

            console.log(notificationData);
    
            const notification = await sendNotification(notificationData,policeStationTokens);

            res.json({ message: 'Pet Report Saved successfully', result : newSavedPetReport }).status(201);
        }
    } catch (error) {
        console.log('Error occurred in pet Report creation...', error.message);
        res.send(error.message).status(500);
    }
}
      
const getAllMissingPetReport = async (req, res) => {
    try {
        const missingPetComplaints = await PetModel.find();

        if (!missingPetComplaints) {
            return res.status(404).json({ message: "No MissingPet Reports found..." });

        } 
        else if (missingPetComplaints) {

            return res.json({ message: "missing Report for pets found...", result: missingPetComplaints  }).status(200);
        }

    } catch (error) {
        console.error('Error occurred in missingPet Report Get...', error.message);
        res.status(500).json({ error: "Internal Server Error" , message : error.message});
    }
}

const getMissingPetReportById = async (req, res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const petReport = await PetModel.findOne({_id : enteredId});

        if (!petReport) {
            return res.json({ message: "Pet Report not found" }).status(404);
        }
        else {
            res.json({ message: "missing Report for PetReport found....", result: petReport}).status(200);
        }

       
    } catch (error) {
        console.error('Error occurred in petReport getById', error.message);
        res.status(500).json({ error: "Internal Server Error" , message : error.message });
    }
}

const updateMissingReport = async (req,res) => {
     
    const petReportId = req.params.id;
    const dataToBeUpdate = req.body;

    try {

      const updatedPetReport = await PetModel.findByIdAndUpdate(petReportId, dataToBeUpdate, {
        new: true,
      });

      if (!updatedPetReport) {
        return res.json({ message: 'petDetails not found' }).status(404);
      }
      else if (updatedPetReport) {
        res.json({ message : "pet report updated successfully..." , result : updatedPetReport}).status(200);
      }
      
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
}


const deletePetReport = async (req,res) => {

    const enteredId = req.params.id;

    try {

        if(!enteredId) {
            res.send("Please enter a valid Id...").status(400);
        }

        const PetReportToBeDelete = await PetModel.findOneAndDelete({_id : enteredId});

        if(PetReportToBeDelete) {
             res.send("Pet Report Deleted successfully...").status(201);
        } else {
            res.send("Pet Report Not Found...").status(400);
        }
    }
    catch (error) {
        console.error('Error occurred in Pet report delete', error.message);
        res.status(500).json({ error: "Internal Server Error" , message : error.message });
    }

}


module.exports = {deletePetReport,updateMissingReport,getMissingPetReportById,getAllMissingPetReport,reportOfMissingPet}