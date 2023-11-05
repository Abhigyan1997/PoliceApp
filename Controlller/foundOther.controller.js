const FoundOther = require("../Model/foundOther.model")

exports.createFoundOther = async(req, res) =>{
   
    try{
    
      const  { id} = await req?.civilian;
        const newFoundOther = new FoundOther({
            other_description: req.body.other_description,
            other_location: req.body.other_location,
            Date_and_time: req.body.Date_and_time,
            userId : id

        })

        if(!req.body) {
          res.send("Please fill all the details..").status(400);
          return;
      }
         const response = await  newFoundOther.save();
         
         res.status(200).json({success: true, message: "Created found successfully", response})
    
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }
}

exports.getFoundById = async(req, res) =>{
    const {foundId} = req.params;
    try{

         const otherId = await FoundOther.findOne({_id: foundId})
          
         res.status(200).json({success: true,message: " foundById successfully",  otherId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}

exports.getFoundAll = async(req, res) =>{
    try{

        const otherId = await FoundOther.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", otherId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}



exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
        other_description,
        other_location,
        Date_and_time,
        } = req.body;
  
    try {
      
  
      const updatedOther = await FoundOther.findByIdAndUpdate({_id: foundId} ,{$set:{
        other_description,
        other_location,
        Date_and_time,
      }});
   
      if (!updatedOther)
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
      
      const deleteOther = await FoundOther.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deleteOther)
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
  