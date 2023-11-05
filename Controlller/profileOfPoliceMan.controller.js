


const PoliceModel = require ("./../Model/PoliceMan.model");

const GetProfileOfPoliceMan = async (req,res) => {
     
    const { id} = await req ?.Police;

    try {

        const detailsOfPolice = await PoliceModel.findById({ _id : id}) ;

        if (detailsOfPolice) {
            const response = {
                mobileNo :  detailsOfPolice.mobileNo,
                name : detailsOfPolice.name,
                gender: detailsOfPolice.gender,
                email: detailsOfPolice.email,
                profileImage:  detailsOfPolice.profileImage,
                policeStation : detailsOfPolice.policeStation,
                Designation : detailsOfPolice.Designation
            }
        
            res.json ({message : "PoliceMan Data Found.." , result : response}).status(200);
        } else {
            res.json({message : "No PoliceMan Found With The Entered Id..."}).status(404)
        }

    } catch (error) {
        console.log(error.message);
        res.send(error.message).status(500)
    }

}

module.exports = {GetProfileOfPoliceMan}