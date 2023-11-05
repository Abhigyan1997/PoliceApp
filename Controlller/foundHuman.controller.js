const FoundHuman = require("../Model/foundHuman.model")


exports.reportFoundHuman = async(req, res) =>{
    // let human_image;
         
    try{
          // if(req.file) human_image = req.file.filename;
        
          const  { id} = await req?.civilian;

    const newFoundHuman = new FoundHuman({
   
        human_name: req.body.human_name,
        human_age: req.body.human_age,
        human_gender: req.body.human_gender,
        human_image: req.body.human_image,
        Date_and_time: req.body.Date_and_time,
        userId : id
    })
     const response = await  newFoundHuman.save();
     
     res.status(200).json({success: true, message: "Created found successfully", response})

}catch(err){
    console.log(err)
    return res.status(500).json({success: false, message: "Somthing went wrong ", err})
}

}

exports.getFoundById = async(req, res) =>{
    const {foundId} = req.params;
    try{

         const humanId = await FoundHuman.findOne({_id: foundId})
          
         res.status(200).json({success: true,message: " foundById successfully",  humanId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}

exports.getFoundAll = async(req, res) =>{
    try{

        const bagId = await FoundHuman.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", bagId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }


}






exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
        human_name,
        human_age,
        human_gender,
        human_height,
        human_color,
        human_image,
        Date_and_time
        } = req.body;
  
    try {
      
  
      const updatedHuman = await FoundHuman.findByIdAndUpdate({_id: foundId} ,{$set:{
        human_name,
        human_age,
        human_gender,
        human_height,
        human_color,
        human_image,
        Date_and_time
      }});
   
      if (!updatedHuman)
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
      
      const deleteHuman = await FoundHuman.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deleteHuman)
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
  