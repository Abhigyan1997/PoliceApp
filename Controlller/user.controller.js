

const CivilianModel = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken");



exports.registerCivilian = async (req, res) => {
 
  try {
    const {
      password,
      confirmPassword,
      name,
      dob,
      gender,
      address,
      landmark,
      state,
      pincode,
      city,
      mobileno,
      email,
      street,
      image
    } = req.body;
  
    // Check if the mobile number already exists in the database
    const existingCivilian = await CivilianModel.findOne({ mobileno });
    if (existingCivilian) {
      return res.status(400).json({ error: "Mobile number already exists" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Ensure password and confirmPassword are defined
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: "Password or confirmPassword is undefined" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const civilianCreate = new CivilianModel({
      mobileno: mobileno,
      name: name,
      dob: dob,
      gender: gender,
      email: email,
      address: address,
      state: state,
      landmark: landmark,
      street: street,
      pincode: pincode,
      city: city,
      password: hashedPassword,
      // confirmPassword: confirmPassword,
      image: image,
    });

    await civilianCreate.save();

   // Omit sensitive information from the response
    const civilian = await CivilianModel.findOne({ mobileno }).select({
      password: 0,
      confirmPassword: 0,
    });

    const token = jwt.sign(
      { id: civilianCreate._id },
      "121212WE",
      {
        expiresIn: "1h", // Set the expiration time for the token
      }
    );

    res.status(201).json({
      message: "Civilian registered successfully",
      accessToken: token,
      civilian,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.loginCivilian = async (req, res) => {
  try {
    const { mobileno, password } = req.body;

    // Find the user by mobile number
    const civilian = await CivilianModel.findOne({ mobileno });

    // Check if the user exists
    if (!civilian) {
      return res.status(404).json({ error: "Civilian not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, civilian.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: civilian._id }, "121212WE", {
      expiresIn: "1h", // Set the expiration time for the token
    });

    // Return the token in the response
    res
      .status(200)
      .json({
        success: true,
        name: civilian.name,
        mobileno: civilian.mobileno,
        image: civilian.image,
        accessToken: token,
      });
  }catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};



//configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'sinhakimmi622@gmail.com',
      pass: 'qxee ychm ynpv neue'
  }
  //store otp temporily 
})
exports.Civiliansendotp = async (req, res) => {
const { email } = req.body;

if (!email) {
    return res.status(400).json({ message: 'Email is required' })
}
let emailexist=await CivilianModel.findOne({ email });
if(emailexist){
  const otp = otpGenerator.generate(6, { digits: true, uppercase: false, specialChars: false });
  // Save the OTP to the database
  await CivilianModel.updateOne({ email:email }, { otp });
 
  const mailOptions = {
      from: "kimmikumarisinha@gmail.com",
      to: req.body.email,
      subject: "Email Verification for Civilian App",
      html: `<h1 >Your OTP for email verification is: <strong>${otp}</strong> </h1>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).json({ message: 'failed to send otp' })
      }
      console.log('email sent:' + info.response);
      return res.status(200).json({ message: 'OTP sent sucessfully' })
  })
}
else{
return res.status(400).json({ message: 'From this email no account is found' })
}
}


exports.CivilianverfiyOtp = async (req, res) => {
try {

    let email = req.body.email;
    let otp = req.body.otp;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and otp is required' })
    }
    let isuser = await CivilianModel.findOne({ email, otp });

    if (!isuser) {
        return res.status(404).send({ status: false, message: "you enter wrong email or otp" })
    }

    let userID = isuser._id;

    const token = jwt.sign({ _id: userID }, 'Civilian2466', { expiresIn: '24h' });

    return res.status(200).json({ status: true, msg: "OTP send", token: token })
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}
}


exports.Civilianupdatepassword = async (req, res) => {
// try {
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    let token = req.body.token
    console.log(req.body)
    if (!password || !confirmpassword) {
        return res.status(400).json({ status: false, message: "Password or confirm password is missing" });
    }
    if (confirmpassword !== password) {
        return res.status(400).json({ status: false, message: "Password or confirm password must same" });
    }
    if (!token) return res.status(400).json({ status: false, message: "Please provide a token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedconfirmpassword = await bcrypt.hash(confirmpassword, 10); 

    const tokenVerify = jwt.verify(token, 'Civilian2466');
    console.log(tokenVerify)
    let changepassword = await CivilianModel.findOneAndUpdate({ _id: tokenVerify._id }, { $set: { password: hashedPassword, confirmpassword: hashedconfirmpassword, Timewhenyouupadted: new Date() } }, { new: true })


    console.log(changepassword)
    res.status(200).send({ status: true, data: "Successfully updated password for changepassword " });

// } catch (err) { console.error(err); res.status(500).json({ error: 'Internal Server Error' }); }
}


exports.allUsers = async (req,res) => {

  try {

    const allRegisteredUsers = await CivilianModel.find();

    if(allRegisteredUsers) {
      const response = allRegisteredUsers.map((user) => ({
           name : user.name,
           dob : user.dob,
           email : user.email,
           address : user.address,
           state : user.state,
           pinCode : user.pincode
        })
      )

      res.json({message : "All Users Data Found..." , response}).status(201);
    }

  }
  catch (error) {
    res.status(500).json({ error: error.message }); 
  }
     
}