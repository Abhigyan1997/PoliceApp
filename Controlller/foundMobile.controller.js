const FoundMobile = require("../Model/foundMobile.model")


exports.createFoundMobile = async(req, res) =>{

    // let  mobile_image;
         
    try{
        //   if(req.file) mobile_image = req.file.filename;

        const  { id} = await req?.civilian;
    const newFoundMobile = new FoundMobile({
  
        mobile_brand: req.body.mobile_brand,
        mobile_location: req.body.mobile_location,
        mobile_image: req.body.mobile_image,
        Date_and_time: req.body.Date_and_time,
        userId : id
    })

    if(!req.body) {
      res.send("Please fill all the details .").status(400);
      return;
  }
  
     const response = await  newFoundMobile.save();
     
     res.status(200).json({success: true, message: "Created found successfully", response})

}catch(err){
    console.log(err)
    return res.status(500).json({success: false, message: "Somthing went wrong ", err})
}

}

exports.getFoundById = async(req, res ) =>{

    const {foundId} = req.params;
    try{

         const mobileId = await FoundMobile.findOne({_id: foundId})
           
          
         res.status(200).json({success: true,message: " foundById successfully",  mobileId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }


}

exports.getFoundAll = async(req, res) =>{
    try{

        const mobileId = await FoundMobile.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", mobileId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }


}




exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
        mobile_brand,
        mobile_location,
        mobile_image,
        Date_and_time,
        } = req.body;
  
    try {
      
  
      const updatedMobile = await FoundMobile.findByIdAndUpdate({_id: foundId} ,{$set:{
        mobile_brand,
        mobile_location,
        mobile_image,
        Date_and_time,
      }});
   
      if (!updatedMobile)
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

  
  exports.deleteFoundById = async function (req, res) {
  
    try { 
      
      const deleteMobile = await FoundMobile.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deleteMobile)
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
  