
const MissingBag = require("../Model/missingBag.model");
const sendNotification = require ("./../NotificationSending/SendNotificationToPoliceStation");
const PoliceModel = require("./../Model/PoliceMan.model");


exports.reportMissingBag = async function (req, res) {
//   let Bag_image;

//   if (req.file) Bag_image = req.file.filename;
      
  try {

    const  { id} = await req?.civilian;

    const newBagMissing = new MissingBag ({
      Bag_color: req.body.Bag_color,
      Bag_location: req.body.Bag_location,
      Bag_brand: req.body.Bag_brand,
      Bag_ownerName: req.body.Bag_hounorname,
      // Bag_address: req.body.Bag_address,
      // Bag_city: req.body.Bag_city,
      // Bag_state: req.body.Bag_state,
      Bag_number: req.body.Bag_number,
      // Bag_email: req.body.Bag_email,
      // Bag_aadharcard: req.body.Bag_aadharcard,
      // Bag_pin: req.body.Bag_pin,
      Bag_type: req.body.Bag_type,
      Bag_Date: req.body.Bag_Date,
      Bag_image: req.body.Bag_image,
      userId : id
    });



     if(!req.body) {
            res.send("Please fill all the details....").status(400);
            return;
        }

      let newComplaint = await newBagMissing.save();

      // const token = "dWUtTNUnRoK1cHgvG6amtq:APA91bFV1tsuOP60nFAOVEHM-YIgkeIruZh7TGpsqS8KG7LT8Qflm3RHDf_FtXMzWFIgOpB0nDZnTiUzev9t-_mPKmzTqsLNi_EXLCjcd73_YDMGYwVqAOQGA_H53A-LRhbL7VxyoAeO"
      const policeStations = await PoliceModel.find({}, 'Fcm_Token');
      const policeStationTokens = policeStations.map((policeStation) => policeStation.Fcm_Token);
      
      const notificationData = {
        MissingReport_Data : newBagMissing
      };

      console.log(notificationData);

      const notification = await sendNotification(notificationData,policeStationTokens);

      res.status(201).json({ message: "success", result: newComplaint });

  } catch (error) {
    console.log("Error occured.", error.message);
    res.send(error.message).status(500);
  }
};

exports.getMissingBagById = async function (req, res) {
  const bagId = req.params.id;

  try {

    const MissingBagById = await MissingBag.find({_id: bagId});
     

    res.status(200).json({ success: true, MissingBagById });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error Occured in server Process" + error.message,
      });
  }
};

exports.getAllMissingBag = async function (req, res) {
  try {
    const missingBag = await MissingBag.find();

    if (missingBag) res.status(200).json({ success: true, missingBag });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some internal server error occured" });
  }
};

exports.updateMissingBagById = async function (req, res) {
  const { id } = req.params;
  const {
     Bag_color,
      Bag_date,
       Bag_location,
       Bag_brand,
       Bag_hounorname,
       Bag_address,
       Bag_city,
       Bag_state,
       Bag_number,
       Bag_email,
       Bag_aadharcard,
       Bag_pin,
       Bag_type,
       Bag_image
      } = req.body;

  try {

    const updatedBag = await MissingBag.findByIdAndUpdate({_id: id} ,{$set:{
      Bag_color,
      Bag_date,
      Bag_location,
      Bag_brand,
      Bag_hounorname,
      Bag_address,
      Bag_state,
      Bag_number,
      Bag_email,
      Bag_aadharcard,
      Bag_pin,
      Bag_type,
      Bag_city,
      Bag_image
    }});
 
    if (!updatedBag)
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid updateMissing",
        });

    res
      .status(200)
      .json({ success: true, message: "Update updateMissing successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error Occured in SignUp Process" + error.message,
      });
  }
};

exports.deleteBagById = async function (req, res) {

  try { 
    
    const missingBag = await MissingBag.findOneAndDelete({_id: req.params.id});
  

    if (!missingBag)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid id" });

    res
      .status(200)
      .json({ success: true, message: "Delete missingBag successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error Occured in server Process" + error.message,
      });
  }
};
