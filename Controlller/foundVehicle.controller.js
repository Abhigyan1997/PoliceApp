const FoundVehicle = require("../Model/foundVehicle.model")

exports.createFoundVehicle = async(req, res) =>{

    let Vehicle_image;

    try{

      const  { id} = await req?.civilian;

        if(req.file) Vehicle_image = req.file.filename;
        const newFoundVehicle = new FoundVehicle({
    
            Vehicle_image: Vehicle_image,
            Vehicle_brand: req.body.Vehicle_brand,
            found_location: req.body.found_location,
            vehicle_type: req.body.vehicle_type,
            Date_and_time: req.body.Date_and_time,
            userId : id

        })

        if(!req.body) {
          res.send("Please fill all the details.").status(400);
          return;
      }
         const response = await  newFoundVehicle.save();
         
         res.status(200).json({success: true, message: "Created found successfully", response})
    
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }
}

exports.getFoundById = async(req, res) =>{
    
    const {foundId} = req.params;
    try{

         const vehicleId = await FoundVehicle.findOne({_id: foundId})
          
         res.status(200).json({success: true,message: " foundById successfully",  vehicleId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}

exports.getFoundAll = async(req, res) =>{
    try{

        const vehicleId = await FoundVehicle.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", vehicleId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}


exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
        Vehicle_image,
        Vehicle_brand,
        found_location,
        vehicle_type,
        Date_and_time
        } = req.body;
  
    try {
      
  
      const updatedVehicle = await FoundVehicle.findByIdAndUpdate({_id: foundId} ,{$set:{
        Vehicle_image,
        Vehicle_brand,
        found_location,
        vehicle_type,
        Date_and_time
      }});
   
      if (!updatedVehicle)
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
      
      const deleteVehicle = await FoundVehicle.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deleteVehicle)
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
  
