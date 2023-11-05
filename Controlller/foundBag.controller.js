const FoundBag = require("../Model/foundBag.model")


exports.createFoundBag = async (req, res) => {
    //   let bag_Image;
         
try{
    //   if(req.file) bag_Image = req.file.filename;
    
    const  { id} = await req?.civilian;
    const newFoundBag = new FoundBag({
        bag_Image: req.body.bag_Image,
        bag_color: req.body.bag_color,
        bag_location: req.body.bag_location,
        bag_type: req.body.bag_type,
        Date_and_time: req.body.Date_and_time,
        userId : id
    })
    if(!req.body) {
        res.send("Please fill all the details ").status(400);
        return;
    }
     const response = await  newFoundBag.save();

     
     res.status(200).json({success: true, message: "Created found successfully", response})

}catch(err){
    console.log(err)
    return res.status(500).json({success: false, message: "Somthing went wrong ", err})
}

}

exports.getFoundById = async(req, res) =>{
    const {foundId} = req.params;
    try{

         const bagId = await FoundBag.findOne({_id: foundId})
          
         res.status(200).json({success: true,message: " foundById successfully",  bagId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}

exports.getFoundAll = async(req, res) =>{
    try{

        const bagId = await FoundBag.find()
          
        res.status(200).json({success: true,message: "foundAll successfully", bagId})

    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "Somthing went wrong ", err})
    }

}



exports.updateFoundById = async function (req, res) {
    const { foundId } = req.params;
    const {
      bag_Image,
      bag_type,
      Date_and_time,
      bag_color,
      bag_location
        } = req.body;
  
    try {
      
  
      const updatedBag = await FoundBag.findByIdAndUpdate({_id: foundId} ,{$set:{
        bag_Image,
        bag_type,
        Date_and_time,
        bag_location,
        bag_color
      }});
   
      if (!updatedBag)
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
      
      const deleteBag = await FoundBag.findOneAndDelete({_id: req.params.foundId});
    
  
      if (!deleteBag)
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
  