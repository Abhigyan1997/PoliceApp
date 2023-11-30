



const AdminModel = require("../Model/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.AdminSignUp = async (req, res) => {
 
    try {
      const {
        password,
        confirmPassword,
        name,
        dob,
        gender,
        pincode,
        city,
        mobileno,
        email,
        country,
        state,
        image
      } = req.body;
    
      // Check if the mobile number already exists in the database
      const existingAdmin = await AdminModel.findOne({ mobileno });
      if (existingAdmin ) {
        return res.status(400).json({ error: "Mobile number already exists" });
      } else if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }
  
      // Ensure password and confirmPassword are defined
      if (!password || !confirmPassword) {
        return res.status(400).json({ error: "Password or confirmPassword is undefined" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const AdminCreate = new AdminModel({
        mobileno: mobileno,
        name: name,
        dob: dob,
        gender: gender,
        email: email,
        state: state,
        pincode: pincode,
        city: city,
        country: country,
        password: hashedPassword,
        // confirmPassword: confirmPassword,
        image: image,
      });
  
      await AdminCreate.save();
  
     // Omit sensitive information from the response
      const Admin = await AdminModel.findOne({ mobileno }).select({
        password: 0,
        confirmPassword: 0,
      });
  
      const token = jwt.sign(
        { id: AdminCreate._id },
        "121212WE",
        {
          expiresIn: "1h", // Set the expiration time for the token
        }
      );
  
      res.status(201).json({
        message: "Admin registered successfully",
        accessToken: token,
        Admin,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.AdminLogin = async (req, res) => {
    try {
      const { mobileno, password } = req.body;
  
      // Find the Admin by mobile number
      const Admin = await AdminModel.findOne({ mobileno });
  
      // Check if the Admin exists
      if (!Admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, Admin.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: Admin._id }, "121212WE", {
        expiresIn: "1h", // Set the expiration time for the token
      });
  
      // Return the token in the response
      res
        .status(200)
        .json({
          success: true,
          name: Admin.name,
          mobileno: Admin.mobileno,
          image: Admin.image,
          accessToken: token,
        });
    } catch (error) {
      res.status(500).json("issue",{ error: error.message });
    }
  };  

exports.AdminProfile = async (req, res) => {

    const { id} = await req ?.Admin;

    try {

        const detailsOfAdmin = await AdminModel.findById({ _id : id}) ;

        if (detailsOfAdmin) {
            const response = {
                mobileNo :  detailsOfAdmin.mobileno,
                name : detailsOfAdmin.name,
                gender: detailsOfAdmin.gender,
                email: detailsOfAdmin.email,
                profileImage:  detailsOfAdmin.image,
                state : detailsOfAdmin.state,
                country : detailsOfAdmin.country
            }
        
            res.json ({message : "Admin Data Found.." , result : response}).status(200);
        } else {
            res.json({message : "No Admin Found With The Entered Id..."}).status(404)
        }

    } catch (error) {
        console.log(error.message);
        res.send(error.message).status(500)
    }
}