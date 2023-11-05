// controllers/civilian.controller.js
const { CivilianModel } = require('../Model/civilian.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerCivilian = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            dob,
            mobileno,
            email,
            aadharNumber,
            address,
            city,
            state,
            pincode,
            password,
        } = req.body;

        // Check if the mobile number already exists in the database
        const existingCivilian = await CivilianModel.findOne({ mobileno });

        if (existingCivilian) {
            return res.status(400).json({ error: 'Mobile number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const civilian = new CivilianModel({
            firstname,
            lastname,
            dob,
            mobileno,
            email,
            aadharNumber,
            address,
            city,
            state,
            pincode,
            password: hashedPassword, // Store the hashed password
        });

        await civilian.save();

        res.status(201).json({ message: 'Civilian registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginCivilian = async (req, res) => {
    try {
      const { mobileno, password } = req.body;
  
      // Find the civilian by mobile number
      const civilian = await CivilianModel.findOne({ mobileno });
  
      // Check if the civilian exists
      if (!civilian) {
        return res.status(404).json({ error: 'Civilian not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, civilian.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ civilianId: civilian._id }, '121212WE', {
        expiresIn: '1h', // Set the expiration time for the token
      });
  
      // Return the token in the response
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };