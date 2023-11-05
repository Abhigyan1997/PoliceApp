




const BannerModel = require("./../Model/Banner.model");


//Best working ---------
const addBanner = async (req, res) => {
    // const origin = req.headers.origin || 'Unknown Origin';
    // const Banner_image = `${origin}${req.file.path}`;
    // const Banner_image = req.file.filename;
//image
    try {

       

        const newBanner_image = new BannerModel({
            Banner_image : req.body.Banner_image,
           
        });

        if (!newBanner_image) {
            res.json({ message: "Please Fill All The Required Fields." }).status(400);
        } else {
            let newImage = await newBanner_image.save();
            res.json({ message: 'Banner image saved successfully', result: newImage }).status(201);
        }
    } catch (error) {
        console.log('Error occurred in Banner Image', error.message);
        res.send(error.message).status(500);
    }
}



// getting the real image

// const addBanner = async (req, res) => {
//  
//   const Banner_image = req.file.filename;

//   try {
//       const newBanner_image = new BannerModel({
//           Banner_image: Banner_image
//       });

//       if (!newBanner_image) {
//           res.json({ message: "Please Fill All The Required Fields." }).status(400);
//       } else {
//           let newImage = await newBanner_image.save();

//         

//           const imagePath = `${Banner_image}`;
//           const imageBuffer = fs.readFileSync(newBanner_image.Banner_image);
//           console.log(imagePath)

//           
//           res.setHeader('Content-Type', 'image/jpeg'); 
//          
//           res.send(imageBuffer);

//         
//       }
//   } catch (error) {
//       console.log('Error occurred in Banner Image', error.message);
//       res.send(error.message).status(500);
//   }
// };




//working-prop
const getBanners = async (req, res) => {
    try {
        const Banners = await BannerModel.find();

        if (Banners.length === 0) {
            return res.status(404).json({ message: "Banners not found" });
        }

        // Map each banner to include the image URL
        const bannersWithUrls = Banners.map((banner) => {
            return {
                Banner_image: `${banner.Banner_image}`,
                _id: banner._id,
                createdAt: banner.createdAt,
                updatedAt: banner.updatedAt,
                __v: banner.__v,
            };
        });

        res.json({ message: "Banners found", result: bannersWithUrls }).status(200);
    } catch (error) {
        console.error('Error occurred in Banner Image get', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {addBanner,getBanners}