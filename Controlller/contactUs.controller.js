const ContactUs = require("../Model/contactUs.model")



exports.createContactUs = async (req, res ) => {
    try{

        const createContact = new ContactUs({...req.body});
        await createContact.save();
        res.json({ message: 'createContact  saved successfully', status:200, createContact}).status(201);

    }catch (error) {
        return res.status(500).json({success: false, error: error.message });
      }

}

exports.getAllContactUs = async (req, res ) => {

    try{
     
        const getContact = await ContactUs.find();
        res.json({ message: "MissingMobile found", getContact}).status(200);

    }catch (error) {
        return res.status(500).json({success: false, error: error.message });
      }


}
