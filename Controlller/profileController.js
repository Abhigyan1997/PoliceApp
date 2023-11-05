

const UserModel = require("./../Model/user.model");



const GetProfile = async (req,res) => {
     
    const {id} = await req ?.civilian;

    try {

        const detailsOfUser = await UserModel.findById({ _id : id}) ;

        if (detailsOfUser) {
            const response = {
                mobileNo : detailsOfUser.mobileno,
                name : detailsOfUser.name,
                dob: detailsOfUser.dob,
                gender: detailsOfUser.gender,
                email: detailsOfUser.email,
                address: detailsOfUser.address,
                state: detailsOfUser.state,
                landmark: detailsOfUser.landmark,
                street: detailsOfUser.street,
                pincode: detailsOfUser.pincode,
                city: detailsOfUser.city,
                image: detailsOfUser.image,
            }
        
            res.json ({message : "User Data Found.." , result : response}).status(200);
        } else {
            res.json({message : "No User Found"}).status(404)
        }

    } catch (error) {
        console.log(error.message);
        res.send(error.message).status(500)
    }

}

module.exports = {GetProfile}