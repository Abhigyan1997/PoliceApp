






const jwt = require('jsonwebtoken');
const  AdminModel  = require('../Model/Admin.model');

const ExistingAdmin = async (req, res, next) => {
    const headertoken = await req.headers.authorization
   
    
    try {
        if (headertoken == undefined) { res.status(500).json({ message: "Invalid authorization header" }) }
        var [bearerKeyword, token] = headertoken.split(' ');
        if (bearerKeyword.toLowerCase() === 'bearer' && token) {
            var decodedtoken = jwt.verify(token, "121212WE");

        } else {
            res.status(500).json({ message: " Unauthorization Token Provided..." })
        }
        const Admin = await AdminModel.findById(decodedtoken.id)

       
        if(Admin){
            req.Admin = Admin;
        }else{
            res.status(404).json("Admin Not found With The Entered Token...!")
        }
        next()
        
    } catch (error) {
        res.status(500).json({ error: error, });
    }
};

module.exports = {ExistingAdmin}
