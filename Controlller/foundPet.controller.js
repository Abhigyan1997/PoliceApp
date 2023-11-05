const FoundPet = require("../Model/foundPet.model")

exports.createFoundPet = async(req, res) =>{
//    let pet_image;

    try{

        // if(req.file) pet_image = req.file.filename;
        const  { id} = await req?.civilian;
        const newFoundPet = new FoundPet({
    
            pet_image: req.body.pet_image,
            pet_color: req.body.pet_color,
            pet_location: req.body.pet_location,
            Date_and_time: req.body.Date_and_time,
            userId : id

        })

        if(!req.body) {
          res.send("Please fill all the details .").status(400);
          return;
      }
         const response = await  newFoundPet.save();
         
         res.status(200).json({success: true, message: "Created found successfully", response})
    
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }
}

exports.getFoundById = async(req, res) =>{

    const {foundId} = req.params;
    try{

         const petId = await FoundPet.findOne({_id: foundId})
          
         res.status(200).json({success: true,message: " foundById successfully",  petId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}

exports.getFoundAll = async(req, res) =>{

    try{

        const petId = await FoundPet.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", petId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }
}



exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
        pet_image,
        pet_color,
        pet_location,
        Date_and_time
        } = req.body;
  
    try {
      
  
      const updatedPet = await FoundPet.findByIdAndUpdate({_id: foundId} ,{$set:{
        pet_image,
        pet_color,
        pet_location,
        Date_and_time
      }});
   
      if (!updatedPet)
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
      
      const deletePet = await FoundPet.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deletePet)
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
  