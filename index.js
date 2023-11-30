const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
const connectToDatabase = require("./Config/db");
// const civilianRouter = require('./Router/civilian.route');
const civilianRouter = require('./Router/user.route');
// const policemenRouter=require('./Router/registerLoginPolicemen.route');
const bagRouter = require('./Router/missingBag.route');
const foundHumanRouter = require('./Router/foundHuman.route');
const foundMobileRouter = require('./Router/foundMobile.route');
const foundOtherRouter = require('./Router/foundOther.route');
const vehicleRouter = require("./Router/missingVehicle.route")
const missingOtherRouter = require("./Router/missingOther.route");
const bannerRouter = require("./Router/banner.route")
const videoRouter = require("./Router/video.route");
const newsRouter = require("./Router/news.route");
const HumanRouter = require('./Router/missingHuman.route');
const missingMobile = require("./Router/MissingMobile.route");
const LiveUpdatesRouter = require("./Router/live_Updates.route");
const PetRouter = require("./Router/missingPet.route");
const allComplaints = require("./Router/allComplaints.route");
const contactUs = require("./Router/contactUs.router");
const profileRouter = require("./Router/profile.route");
const ComplaintStatusChangeRouter = require("./Router/allstatusupdate.route")
const AllComplaintBasisOnStatusRouter = require("./Router/allcomplainstatus.router")
const allComplaintsOfUser = require("./Router/fetchComplaintsByUserid.route");
const registerLoginPolicemen = require ("./Router/registerLoginPolicemen.route");
const PoliceProfileRouter = require("./Router/PoliceManProfile.router");
const { postphonebook, getphonebook } = require('./Router/phonebooks.route');
const { emergancyRoute, getnotificationRoute, deletenotificationRoute, getAllnotificationRoute, acceptCallRequestRoute } = require('./Router/emergancyCall.route');
const { sendNotification } = require('./sendnotification/sendNotifications');
const AdminRouter = require("./Router/Admin.router");
const app = express();
const port = process.env.PORT || 8080;



const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

//image
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// app.use('/civilian', civilianRouter);
app.use('/civilian', civilianRouter);
app.use('/missing-bag', bagRouter);
app.use('/found-human', foundHumanRouter)
app.use('/found-mobile', foundMobileRouter)
app.use('/found-other', foundOtherRouter)
app.use('/missing-vehicle', vehicleRouter);
app.use("/missingOther", missingOtherRouter);
app.use("/Banner", bannerRouter);
app.use("/VideoRoute", videoRouter);
app.use("/contactUs", contactUs);
app.use("/newsRoute", newsRouter);
app.use("/missingHuman", HumanRouter);
app.use("/complaints", allComplaints);
app.use('/user' , profileRouter);
app.use("/missing-mobile" , missingMobile);
app.use("/missing-pet", PetRouter);
app.use("/Live-Updates", LiveUpdatesRouter);
app.use("/Complaints" , allComplaintsOfUser);
app.use("/registerPolice" , registerLoginPolicemen);
app.use("/changeStatusOfComplaint" , ComplaintStatusChangeRouter);
app.use("/getComplaints" , AllComplaintBasisOnStatusRouter);

// emergency  call routes
app.use('/user', emergancyRoute);
app.use('/user', sendNotification);
app.use('/police', getnotificationRoute);
app.use('/police', deletenotificationRoute);
app.use('/police', getAllnotificationRoute);
app.use('/police', acceptCallRequestRoute);
app.use('/police', PoliceProfileRouter);


// user profile related routes
app.use('/user', postphonebook);
app.use('/user', getphonebook);

app.use("/PoliceApp/Admin" , AdminRouter);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


server.listen(port, async () => {
    try {
        await connectToDatabase();
        console.log(port, "<<port");
    } catch (err) {
        console.log({ message: "Failed to connect Database", err });
    }
});


io.on('connection', (socket) => {
    console.log('A user connected  ' + socket.id);

    socket.on('locationUpdate', (locationData) => {
        io.emit('locationUpdated', locationData);
    });



    socket.on('disconnect', () => {
        console.log('A user disconnected  ' + socket.id);
    });
});
