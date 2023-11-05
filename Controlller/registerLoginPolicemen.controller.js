const PolicemenModel  = require("../Model/PoliceMan.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerPolicewala = async (req, res) => {
  try {

    const password = req.body.password;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const policewala = new PolicemenModel({
        profileImage : req.body.profileImage,
        name : req.body.name,
        email : req.body.email,
        mobileNo : req.body.mobileNo,
        gender : req.body.gender,
        aadharNumber : req.body.aadharNumber,
        Designation : req.body.Designation,
        policeStation : req.body.policeStation,
        password: hashedPassword,
        Fcm_Token : req.body.Fcm_Token,
      });
   
    const existingPolicewala = await PolicemenModel.findOne({ mobileNo : req.body.mobileNo });

    if (existingPolicewala) {
      return res.status(400).json({ error: "Mobile number already exists" });
    }

      await policewala.save();

      let resultToBeShown = {
        name : policewala.name,
        email : policewala.email,
        mobileNo : policewala.mobileNo,
        gender : policewala.gender,
        aadharNumber : policewala.aadharNumber,
        Designation : policewala.Designation,
        policeStation : policewala.policeStation,
      }

      res.status(201).json({ message: "Policewala registered successfully" , Details_Entered_By_PoliceMan : resultToBeShown});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.loginPolicewala = async (req, res) => {
  try {
    const { mobileNo, password, Fcm_Token } = req.body;

    if(!req.body.mobileNo || !req.body.password || !req.body.Fcm_Token) {
         res.json({message : "Please Fill All The Details..."}).status(400);
    }

    const policewala = await PolicemenModel.findOne({mobileNo : req.body.mobileNo });

    if (!policewala) {
      return res.status(404).json({ error: "Policewala not found" });
    }

    const passwordMatch = await bcryptjs.compare(password, policewala.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { policewalaId: policewala._id },
      "121212WE",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message : `Data Found With entered MobileNo ${policewala.mobileNo} , Name is ${policewala.name} and Designation is ${policewala.Designation}`, Authentication_Token : token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.GetAllPoliceMen = async (req,res) => {

  try {

    const PoliceMen = await PolicemenModel.find();

  if(PoliceMen) {
      res.json({message : "Police Man Data Found" , result : PoliceMen}).status(201);
  } else {
      res.json({message : "NO Data Found..."}).status(404);
  }

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  
}
}