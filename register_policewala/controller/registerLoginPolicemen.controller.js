const { PolicemenModel } = require("../model/registerLoginPolicemen.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const geocoder = require("geocoder");

exports.registerPolicewala = async (req, res) => {
  try {
    const {
      profileImage,
      name,
      email,
      mobile,
      gender,
      aadharNumber,
      rank,
      policeStationAddress,
      password,
      fcmToken,
    } = req.body;

    const existingPolicewala = await PolicemenModel.findOne({ mobile });

    if (existingPolicewala) {
      return res.status(400).json({ error: "Mobile number already exists" });
    }

    // Convert the policeStationAddress to coordinates (latitude and longitude)
    let coordinates = null;
    await geocoder.geocode(policeStationAddress, async (err, data) => {
      if (err || !data.results[0]) {
        return res
          .status(400)
          .json({ error: "Invalid police station address" });
      }
      coordinates = {
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      };

      const hashedPassword = await bcrypt.hash(password, 10);

      const policewala = new PolicemenModel({
        profileImage,
        name,
        email,
        mobile,
        gender,
        aadharNumber,
        rank,
        policeStation: coordinates,
        password: hashedPassword,
        fcmToken,
      });

      await policewala.save();

      res.status(201).json({ message: "Policewala registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginPolicewala = async (req, res) => {
  try {
    const { mobile, password, fcmToken } = req.body;

    const policewala = await PolicemenModel.findOne({ mobile });

    if (!policewala) {
      return res.status(404).json({ error: "Policewala not found" });
    }

    const passwordMatch = await bcrypt.compare(password, policewala.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { policewalaId: policewala._id },
      "your-secret-key",
      {
        expiresIn: "1h",
      }
    );

    
    policewala.fcmToken = fcmToken;
    await policewala.save();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
